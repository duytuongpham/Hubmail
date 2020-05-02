var emailSubmitted = localStorage.emailSubmitted === 'true';
var emailSubmittedUS = localStorage.emailSubmittedUS === 'true';
var emailSubmitted2 = localStorage.emailSubmitted2 === 'true';
var emailSubmittedUS2 = localStorage.emailSubmittedUS2 === 'true';
var emailDebounceTimer = 5;
var emailDebounceTracker;
var modalRegionMap = {
  "SF": westCoastFlag ? "WC" : "SF",
  "US": "US"
};

// Logged in users should never see the email modal
if (loggedIn) {
  localStorage.setItem('emailSubmitted', 'true');
  localStorage.setItem('emailSubmitted2', 'true');
  localStorage.setItem('emailSubmittedUS', 'true');
  localStorage.setItem('emailSubmittedUS2', 'true');
}

// will currently pop up ever time for user if they haven't given us their email - should we do so if they click the X?
var submitEmailModal = function() {
  fbq('track', 'Lead');
  var userRegion, userEmail;
  userRegion = modalRegionMap[stateCity];
  userEmail = $('#email-modal__input').val();
  if (typeof clevertap !== "undefined") {
    clevertap.profile.push({
      "Site": {
        "Email": userEmail,
        "Modal-signup": true,
        "Location": userRegion,
        "Modal-signup-time": new Date().toGMTString(),
        "MSG-email": true,
        "MSG-push": true,
        "MSG-sms": true
      }
    });
  }

  $.ajax({
    url: "https://docs.google.com/a/grubmarket.com/forms/d/1ljNjR68Z5UJffdMNJXLvVUH96dsG93I__OaHvJ1NbzM/formResponse",
    data: {"entry.1319937412": userEmail, "entry.1053142464": userRegion},
    type: "POST",
    dataType: "xml",
    success: function(formRespnse) {
      console.log(formRespnse);
    },
    error: function(err) {
      console.log(err);
    }
  });
}
var setModalTimeout = function() {
  var otherModalOpen = $('.modal__close').is(':visible');
  var emailSubmitted = localStorage.emailSubmitted === 'true';
  var emailSubmittedUS = localStorage.emailSubmittedUS === 'true';
  var emailSubmitted2 = localStorage.emailSubmitted2 === 'true';
  var emailSubmittedUS2 = localStorage.emailSubmittedUS2 === 'true';

  if (!loggedIn && (!emailSubmitted || !emailSubmitted2) && !otherModalOpen && modalRegionMap[stateCity] != 'US') {
    $('#email-modal-wrapper').popup('show');
  } else if (!loggedIn && (!emailSubmittedUS || !emailSubmittedUS2) && !otherModalOpen && modalRegionMap[stateCity] == 'US') {
	$('#email-modal-wrapper').popup('show');
  } else {
    checkModalTimeout();
  }
}

var checkModalTimeout = function() {
  clearTimeout(emailDebounceTracker);
  setTimeout(setModalTimeout, emailDebounceTimer);
}
var checkEmailFormat = function(userEmail) {
  var filter = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if(userEmail.length == 0)
  {
    return false;
  }
  else
  {
    if(!filter.test(userEmail.toLowerCase())){
      return false;
    }
    else  {
      return true;
    }
  }
}
var setBorderForInput = function() {
  var $modalEmailInput = $('#email-modal__input');

  if (checkEmailFormat($modalEmailInput.val())) {
    $modalEmailInput.css('border', '2px solid #52CC87');
  }
  else {
    $modalEmailInput.css('border', '2px solid #eb8787');
  }
}
var emailValidationOnKeyUp = function() {
  var $modalEmailInput = $('#email-modal__input');

  $modalEmailInput.on('keyup', setBorderForInput);
}
var setEmailModalEvents = function() {
  $('.email-modal-close').on('click', function() {
	var emailSubmitted = localStorage.emailSubmitted === 'true';
	var emailSubmittedUS = localStorage.emailSubmittedUS === 'true';
	if (modalRegionMap[stateCity] == 'US') {
		if (emailSubmittedUS) {
			localStorage.setItem('emailSubmittedUS2', 'true');
		}
		localStorage.setItem('emailSubmittedUS', 'true');
	} else {
		if (emailSubmitted) {
			localStorage.setItem('emailSubmitted2', 'true');
		}
		localStorage.setItem('emailSubmitted', 'true');	
	}
    fbq('track', 'Search', {
      search_string: modalRegionMap[stateCity],
      content_category: 'X',
      content_ids: ['X'],
      value: '1',
      currency: 'USD',
    });
    goog_conv_custom(950476559, 'HBDZCNXGhGMQj76cxQM');
  })
  $('#email-form-submit').on('click', function(e)  {
    e.preventDefault();
    e.stopPropagation();
    goog_conv_custom(950476559, 'uNqTCOeujmMQj76cxQM');
    var $modalEmailInput = $('#email-modal__input');
    var isValidEmail = checkEmailFormat($modalEmailInput.val());

    if (isValidEmail) {
    	  if (modalRegionMap[stateCity] == 'US') {
    		localStorage.setItem('emailSubmittedUS', 'true');
    		localStorage.setItem('emailSubmittedUS2', 'true');
    	  } else {
        localStorage.setItem('emailSubmitted', 'true');
        localStorage.setItem('emailSubmitted2', 'true');
    	  }
      $('#email-modal-wrapper').popup('hide');
      $('#rebate-modal-wrapper').popup('show');
      submitEmailModal();
    }
    else {
      $modalEmailInput.css('border', '2px solid #eb8787');
      emailValidationOnKeyUp();
    }
  });
  $('#email-form-submit2').on('click', function(e)  {
	  $('#email-modal-wrapper_background').popup('hide');
	  $('#email-modal-wrapper_wrapper').popup('hide');
  });
}
var setEmailModal = function() {
  var emailDebounceTimer = 7000;
  var emailDebounceTracker;

  setEmailModalEvents();
  checkModalTimeout();
}

if (botCheck() === false) {
	setEmailModal();
}

function botCheck(){
  var botPattern = "(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
  var re = new RegExp(botPattern, 'i');
  var userAgent = navigator.userAgent;
  if (re.test(userAgent)) {
      return true;
  }else{
    return false;
  }
}