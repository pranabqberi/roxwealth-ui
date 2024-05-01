import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  // Dropdown,
  // DropdownButton,
  Form,
  OverlayTrigger,
  Row
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import axios from 'axios';
import validateSession from 'Actions/validateSession';
import redirect from 'Actions/Redirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faKey, faMailBulk, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from 'providers/ToastProvider';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Tooltip } from 'react-bootstrap';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { encrypt } from 'Actions/AESUtil';

interface RegisterProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  termsService?: boolean;
}

// const emailPattern =
//   '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+.+(xn--vermgensberatung-pwb|xn--vermgensberater-ctb|xn--clchc0ea0b2g2a9gcd|xn--w4r85el8fhu5dnra|travelersinsurance|northwesternmutual|xn--xkc2dl3a5ee0h|xn--mgberp4a5d4ar|xn--mgbai9azgqp6j|xn--bck1b9a5dre4c|xn--5su34j936bgsg|xn--3oq18vl8pn36a|xn--xkc2al3hye2a|xn--mgba7c0bbn0a|xn--fzys8d69uvgm|xn--nqv7fs00ema|xn--mgbc0a9azcg|xn--mgbaakc7dvf|xn--mgba3a4f16a|xn--lgbbat1ad8j|xn--kcrx77d1x4a|xn--i1b6b1a6a2e|sandvikcoromant|kerryproperties|americanexpress|xn--rvc1e0am3e|xn--mgbx4cd0ab|xn--mgbi4ecexp|xn--mgbca7dzdo|xn--mgbbh1a71e|xn--mgbb9fbpob|xn--mgbayh7gpa|xn--mgbaam7a8h|xn--mgba3a3ejt|xn--jlq61u9w7b|xn--h2breg3eve|xn--fiq228c5hs|xn--b4w605ferd|xn--80aqecdr1a|xn--6qq986b3xl|xn--54b7fta0cc|weatherchannel|kerrylogistics|cookingchannel|cancerresearch|bananarepublic|americanfamily|afamilycompany|xn--ygbi2ammx|xn--yfro4i67o|xn--tiq49xqyj|xn--h2brj9c8c|xn--fzc2c9e2c|xn--fpcrj9c3d|xn--eckvdtc9d|wolterskluwer|travelchannel|spreadbetting|lifeinsurance|international|xn--qcka1pmc|xn--ogbpf8fl|xn--ngbe9e0a|xn--ngbc5azd|xn--mk1bu44c|xn--mgbt3dhd|xn--mgbpl2fh|xn--mgbgu82a|xn--mgbab2bd|xn--mgb9awbf|xn--gckr3f0f|xn--8y0a063a|xn--80asehdb|xn--80adxhks|xn--45br5cyl|xn--3e0b707e|versicherung|scholarships|lplfinancial|construction|xn--zfr164b|xn--xhq521b|xn--w4rs40l|xn--vuq861b|xn--t60b56a|xn--ses554g|xn--s9brj9c|xn--rovu88b|xn--rhqv96g|xn--q9jyb4c|xn--pgbs0dh|xn--pbt977c|xn--nyqy26a|xn--mix891f|xn--mgbtx2b|xn--mgbbh1a|xn--kpu716f|xn--kpry57d|xn--kprw13d|xn--jvr189m|xn--j6w193g|xn--imr513n|xn--hxt814e|xn--h2brj9c|xn--gk3at1e|xn--gecrj9c|xn--g2xx48c|xn--flw351e|xn--fjq720a|xn--fct429k|xn--estv75g|xn--efvy88h|xn--d1acj3b|xn--czr694b|xn--cck2b3b|xn--9krt00a|xn--80ao21a|xn--6frz82g|xn--55qw42g|xn--45brj9c|xn--42c2d9a|xn--3hcrj9c|xn--3ds443g|xn--3bst00m|xn--2scrj9c|xn--1qqw23a|xn--1ck2e1b|xn--11b4c3d|williamhill|rightathome|redumbrella|progressive|productions|playstation|photography|olayangroup|motorcycles|lamborghini|kerryhotels|investments|foodnetwork|enterprises|engineering|creditunion|contractors|calvinklein|bridgestone|blockbuster|blackfriday|barclaycard|accountants|xn--y9a3aq|xn--wgbl6a|xn--wgbh1c|xn--unup4y|xn--pssy2u|xn--o3cw4h|xn--mxtq1m|xn--kput3i|xn--io0a7i|xn--fiqz9s|xn--fiqs8s|xn--fiq64b|xn--czru2d|xn--czrs0t|xn--cg4bki|xn--c2br7g|xn--9et52u|xn--9dbq2a|xn--90a3ac|xn--80aswg|xn--5tzm5g|xn--55qx5d|xn--4gbrim|xn--45q11c|xn--3pxu8k|xn--30rr7y|volkswagen|vlaanderen|vistaprint|university|telefonica|technology|tatamotors|swiftcover|schaeffler|restaurant|republican|realestate|prudential|protection|properties|onyourside|nextdirect|newholland|nationwide|mitsubishi|management|industries|immobilien|healthcare|foundation|extraspace|eurovision|cuisinella|creditcard|consulting|capitalone|boehringer|bnpparibas|basketball|associates|apartments|accountant|yodobashi|xn--vhquv|xn--tckwe|xn--p1acf|xn--nqv7f|xn--ngbrx|xn--l1acc|xn--j1amh|xn--j1aef|xn--fhbei|xn--e1a4c|xn--d1alf|xn--c1avg|xn--90ais|vacations|travelers|stockholm|statefarm|statebank|solutions|shangrila|scjohnson|richardli|pramerica|passagens|panasonic|microsoft|melbourne|marshalls|marketing|lifestyle|landrover|lancaster|ladbrokes|kuokgroup|insurance|institute|honeywell|homesense|homegoods|homedepot|hisamitsu|goodhands|goldpoint|furniture|fujixerox|frontdoor|fresenius|firestone|financial|fairwinds|equipment|education|directory|community|christmas|bloomberg|barcelona|aquarelle|analytics|amsterdam|allfinanz|alfaromeo|accenture|yokohama|xn--qxam|xn--p1ai|xn--node|xn--90ae|woodside|verisign|ventures|vanguard|uconnect|training|telecity|symantec|supplies|stcgroup|software|softbank|showtime|shopping|services|security|samsclub|saarland|reliance|redstone|property|plumbing|pictures|pharmacy|partners|observer|movistar|mortgage|merckmsd|memorial|mckinsey|maserati|marriott|lundbeck|lighting|jpmorgan|istanbul|ipiranga|infiniti|hospital|holdings|helsinki|hdfcbank|guardian|graphics|grainger|goodyear|frontier|football|firmdale|fidelity|feedback|exchange|everbank|etisalat|esurance|ericsson|engineer|download|discover|discount|diamonds|democrat|deloitte|delivery|computer|commbank|clothing|clinique|cleaning|cityeats|cipriani|chrysler|catholic|catering|capetown|business|builders|budapest|brussels|broadway|bradesco|boutique|baseball|bargains|barefoot|barclays|attorney|allstate|airforce|abudhabi|zuerich|youtube|yamaxun|xfinity|winners|windows|whoswho|wedding|website|weather|watches|wanggou|walmart|trading|toshiba|tiffany|tickets|theatre|theater|temasek|systems|surgery|support|storage|statoil|starhub|staples|spiegel|singles|shriram|shiksha|science|schwarz|schmidt|sandvik|samsung|rexroth|reviews|rentals|recipes|realtor|politie|pioneer|philips|panerai|origins|organic|oldnavy|okinawa|neustar|network|netflix|netbank|monster|metlife|markets|lincoln|limited|liaison|leclerc|latrobe|lasalle|lanxess|lancome|lacaixa|komatsu|kitchen|juniper|jewelry|ismaili|iselect|hyundai|hotmail|hoteles|hosting|holiday|hitachi|hangout|hamburg|guitars|grocery|godaddy|genting|gallery|fujitsu|frogans|forsale|flowers|florist|flights|fitness|fishing|finance|ferrero|ferrari|fashion|farmers|express|exposed|domains|digital|dentist|cruises|cricket|courses|coupons|country|corsica|cooking|contact|compare|company|comcast|cologne|college|clubmed|citadel|chintai|channel|cartier|careers|caravan|capital|bugatti|brother|booking|bestbuy|bentley|bauhaus|banamex|avianca|auspost|audible|auction|athleta|android|alibaba|agakhan|academy|abogado|zappos|yandex|yachts|xperia|xihuan|webcam|warman|walter|vuelos|voyage|voting|vision|virgin|villas|viking|viajes|unicom|travel|toyota|tkmaxx|tjmaxx|tienda|tennis|tattoo|target|taobao|taipei|sydney|swatch|suzuki|supply|studio|stream|social|soccer|shouji|select|secure|search|schule|school|sanofi|sakura|safety|ryukyu|rogers|rocher|review|report|repair|reisen|realty|racing|quebec|pictet|piaget|physio|photos|pfizer|otsuka|orange|oracle|online|olayan|office|nowruz|norton|nissay|nissan|natura|nagoya|mutual|museum|moscow|mormon|monash|mobily|mobile|mattel|market|makeup|maison|madrid|luxury|london|locker|living|lefrak|lawyer|latino|lancia|kosher|kindle|kinder|kaufen|juegos|joburg|jaguar|intuit|insure|imamat|hughes|hotels|hockey|hiphop|hermes|health|gratis|google|global|giving|george|garden|gallup|futbol|flickr|family|expert|events|estate|energy|emerck|durban|dupont|dunlop|doctor|direct|design|dental|degree|dealer|datsun|dating|cruise|credit|coupon|condos|comsec|coffee|clinic|claims|circle|church|chrome|chanel|center|casino|caseih|career|camera|broker|boston|bostik|blanco|bharti|berlin|beauty|bayern|author|aramco|anquan|alstom|alsace|alipay|airtel|airbus|agency|africa|active|abbvie|abbott|abarth|zippo|yahoo|xerox|world|works|weibo|weber|watch|wales|volvo|vodka|vista|video|vegas|ubank|tushu|tunes|trust|trade|tours|total|toray|tools|tokyo|today|tmall|tirol|tires|tatar|swiss|sucks|style|study|store|stada|space|solar|smile|smart|sling|skype|shoes|shell|sharp|seven|sener|salon|rugby|rodeo|rocks|ricoh|reise|rehab|radio|quest|promo|prime|press|praxi|poker|place|pizza|photo|phone|party|parts|paris|osaka|omega|nowtv|nokia|ninja|nikon|nexus|nadex|movie|mopar|money|miami|media|mango|macys|lupin|lotto|lotte|locus|loans|lixil|lipsy|linde|lilly|lexus|legal|lease|lamer|kyoto|koeln|jetzt|iveco|irish|intel|ikano|hyatt|house|horse|honda|homes|guide|gucci|group|gripe|green|gmail|globo|glass|glade|gives|gifts|games|gallo|forum|forex|final|fedex|faith|epson|epost|email|edeka|earth|dubai|drive|dodge|delta|deals|dance|dabur|cymru|crown|codes|coach|cloud|click|citic|cisco|cheap|chase|cards|canon|build|bosch|boots|boats|black|bingo|bible|beats|baidu|azure|autos|audio|archi|apple|amica|amfam|aetna|adult|actor|zone|zero|zara|yoga|xbox|work|wine|wiki|wien|weir|wang|voto|vote|vivo|viva|visa|vana|tube|toys|town|tips|tiaa|teva|tech|team|taxi|talk|surf|star|spot|sony|song|sohu|sncf|skin|site|sina|silk|show|shop|shia|shaw|sexy|seek|seat|scot|scor|saxo|save|sarl|sapo|sale|safe|ruhr|rsvp|room|rmit|rich|rest|rent|reit|read|raid|qpon|prof|prod|post|porn|pohl|plus|play|pink|ping|pics|pccw|pars|page|open|ollo|nike|nico|next|news|navy|name|moto|moda|mobi|mint|mini|menu|meme|meet|maif|luxe|ltda|love|loft|loan|live|link|limo|like|life|lidl|lgbt|lego|land|kred|kpmg|kiwi|kddi|jprs|jobs|jeep|java|itau|info|immo|imdb|ieee|icbc|hsbc|host|hgtv|here|help|hdfc|haus|hair|guru|guge|goog|golf|gold|gmbh|gift|ggee|gent|gbiz|game|fund|free|ford|food|flir|fish|fire|film|fido|fiat|fast|farm|fans|fail|fage|erni|dvag|duns|duck|doha|docs|dish|diet|desi|dell|deal|dclk|date|data|cyou|coop|cool|club|city|citi|chat|cern|cbre|cash|case|casa|cars|care|camp|call|cafe|buzz|book|bond|bofa|blue|blog|bing|bike|best|beer|bbva|bank|band|baby|auto|audi|asia|asda|arte|arpa|army|arab|amex|ally|akdn|aigo|aero|adac|able|aarp|zip|yun|you|xyz|xxx|xin|wtf|wtc|wow|wme|win|wed|vip|vin|vig|vet|ups|uol|uno|ubs|tvs|tui|trv|top|tjx|thd|tel|tdk|tci|tax|tab|stc|srt|srl|soy|sky|ski|sfr|sex|sew|ses|scb|sca|sbs|sbi|sas|sap|rwe|run|rip|rio|ril|ren|red|qvc|pwc|pub|pru|pro|pnc|pin|pid|phd|pet|pay|ovh|ott|org|ooo|onl|ong|one|off|obi|nyc|ntt|nrw|nra|now|nhk|ngo|nfl|new|net|nec|nba|nab|mtr|mtn|msd|mov|mom|moi|moe|mma|mls|mlb|mit|mil|meo|men|med|mba|map|man|ltd|lpl|lol|lds|law|lat|krd|kpn|kim|kia|kfh|joy|jot|jnj|jmp|jll|jlc|jio|jcp|jcb|iwc|itv|ist|int|ink|ing|ifm|icu|ice|ibm|how|hot|hkt|hiv|hbo|gov|got|gop|goo|gmx|gmo|gle|gea|gdn|gap|gal|fyi|fun|ftr|frl|fox|foo|fly|fit|fan|eus|esq|edu|eco|eat|dvr|dtv|dot|dog|dnp|diy|dhl|dev|dds|day|dad|csc|crs|com|cfd|cfa|ceo|ceb|cbs|cbn|cba|cat|car|cam|cal|cab|bzh|buy|box|bot|boo|bom|bnl|bmw|bms|biz|bio|bid|bet|bcn|bcg|bbt|bbc|bar|axa|aws|art|app|aol|anz|aig|afl|aeg|ads|aco|abc|abb|aaa|zw|zm|za|yt|ye|ws|wf|vu|vn|vi|vg|ve|vc|va|uz|uy|us|uk|ug|ua|tz|tw|tv|tt|tr|to|tn|tm|tl|tk|tj|th|tg|tf|td|tc|sz|sy|sx|sv|su|st|sr|so|sn|sm|sl|sk|sj|si|sh|sg|se|sd|sc|sb|sa|rw|ru|rs|ro|re|qa|py|pw|pt|ps|pr|pn|pm|pl|pk|ph|pg|pf|pe|pa|om|nz|nu|nr|np|no|nl|ni|ng|nf|ne|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|mn|mm|ml|mk|mh|mg|me|md|mc|ma|ly|lv|lu|lt|ls|lr|lk|li|lc|lb|la|kz|ky|kw|kr|kp|kn|km|ki|kh|kg|ke|jp|jo|jm|je|it|is|ir|iq|io|in|im|il|ie|id|hu|ht|hr|hn|hm|hk|gy|gw|gu|gt|gs|gr|gq|gp|gn|gm|gl|gi|gh|gg|gf|ge|gd|gb|ga|fr|fo|fm|fk|fj|fi|eu|et|es|er|eg|ee|ec|dz|do|dm|dk|dj|de|cz|cy|cx|cw|cv|cu|cr|co|cn|cm|cl|ck|ci|ch|cg|cf|cd|cc|ca|bz|by|bw|bv|bt|bs|br|bo|bn|bm|bj|bi|bh|bg|bf|be|bd|bb|ba|az|ax|aw|au|at|as|ar|aq|ao|am|al|ai|ag|af|ae|ad|ac)';

const addProfile = async (name: string, email: string, mobile: string) => {
  // const URL = 'https://engine.qberi.com/api/addProfile';
  const URL = 'http://localhost:8080/api/addProfile';

  const data = {
    name: name,
    email: email,
    mobile: mobile,
    profilePicture: 'https://www.w3schools.com/howto/img_avatar.png'
  };
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const sessionToken = session.sessionToken;
  const encryptedData = encrypt(JSON.stringify(data));
  const headers = {
    'Content-Type': 'text/plain',
    Authorization: 'Bearer ' + sessionToken
  };
  try {
    const response = await axios.post(URL, encryptedData, { headers });
    console.log('Success in adding profile');
    console.log(response.data);
  } catch (error) {
    console.log('Error in adding profile');
    console.error(error);
  }
};

const validatePassword = (password: string) => {
  // password must contain one upper, one lower letter, one digit and one special character
  const lowerLetters = /[a-z]/g;
  const upperLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const specialCharacters = /[@$!%*?&#()]/g;
  if (
    !password.match(lowerLetters) ||
    !password.match(upperLetters) ||
    !password.match(numbers) ||
    !password.match(specialCharacters)
  ) {
    return false;
  }
  return true;
};

const validateEmail = (email: string) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
};

const validateMobile = (mobile: string) => {
  return true;
  console.log(mobile);
};

const SignUpForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { showToast } = useContext(ToastContext);

  const [registerData, setRegisterData] = useState<RegisterProps>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsService: false
  });

  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [termsServiceError, setTermsServiceError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    // clear errors
    if (name === 'name') {
      setNameError('');
    }
    if (name === 'email') {
      setEmailError('');
    }
    if (name === 'phone') {
      setPhoneError('');
    }
    if (name === 'password') {
      setPasswordError('');
      setConfirmPasswordError('');
    }
    if (name === 'confirmPassword') {
      setConfirmPasswordError('');
    }
    if (name === 'termsService') {
      setTermsServiceError('');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Qberi | Sign Up';
    // check if user is already logged in
    if (validateSession()) {
      const nextPath = redirect();
      navigate(nextPath);
    }
  }, []);

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setPasswordError('');
    setConfirmPasswordError('');
    setRegisterData({ ...registerData, confirmPassword });
    if (registerData.password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const onTermsServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const termsService = e.target.checked;
    setTermsServiceError('');
    setRegisterData({ ...registerData, termsService });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsServiceError('');
    setSuccessMessage('');

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById('confirmPassword') as HTMLInputElement
    ).value;
    const termsService = (
      document.getElementById('termsService') as HTMLInputElement
    ).checked;
    const mobile = (document.getElementById('mobile') as HTMLInputElement)
      .value;

    const errors: string[] = [];

    if (!name) {
      errors.push('Name is required');
      setNameError('Name is required');
    }

    if (!email) {
      errors.push('Email is required');
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      errors.push('Email is invalid');
      setEmailError('Email is invalid');
    }

    if (!mobile) {
      errors.push('Mobile is required');
      setPhoneError('Mobile is required');
    } else if (!validateMobile(mobile)) {
      errors.push('Mobile number is invalid');
      setPhoneError('Mobile number is invalid');
    }

    if (!password) {
      errors.push('Password is required');
      setPasswordError('Password is required');
    } else if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
      setPasswordError('Password must be at least 8 characters');
    } else if (!validatePassword(password)) {
      errors.push(
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      );
      setPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      );
    }

    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
      setConfirmPasswordError('Passwords do not match');
    }

    if (!termsService) {
      errors.push('Please accept the terms and conditions');
      setTermsServiceError('Please accept the terms and conditions');
    }

    if (errors.length > 0) {
      return;
    }

    const data = {
      name,
      firstName: name.split(' ')[0] || '',
      lastName: name.split(' ')[1] || '',
      email,
      password
    };

    // const URL = 'https://engine.qberi.com/api/register';
    const URL = 'http://localhost:8080/api/register';

    const headers = {
      'Content-Type': 'text/plain'
    };
    const encryptedData = encrypt(JSON.stringify(data));

    try {
      const response = await axios.post(URL, encryptedData, { headers });
      console.log(response.data);
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202
      ) {
        setSuccessMessage(
          'You have successfully signed up, redirecting to the Sign-In Page ...'
        );
        console.log('Profile added');
        addProfile(name, email, mobile);
        showToast('You have successfully Registered', 'success');
        setTimeout(() => {
          // window.location.href = '/auth/sign-in';
          navigate('/auth/sign-in');
        }, 1000);
      } else {
        console.log('Error in signing up');
        showToast('Error during Registration', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Error during Registration', 'error');
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cnfPasswordVisible, setCnfPasswordVisible] = useState(false);

  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-1000">Register</h3>
        <p className="text-700">Create your account today</p>
      </div>
      <Row className="align-items-center">
        <Col xs={12} className="mb-3 text-center d-flex justify-content-center">
          <AuthSocialButtons title="Register" />
        </Col>
      </Row>
      <div className="position-relative mt-4">
        <hr className="bg-200" />
        <div className="divider-content-center">or use email</div>
      </div>
      <Form>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="name">Full Name</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="name"
              type="text"
              placeholder="Name"
              className="form-icon-input"
              required
              value={registerData.name}
              onChange={handleChange}
              name="name"
            />
            <FontAwesomeIcon
              icon={faUser}
              className="text-900 fs-9 form-icon"
            />
          </div>
          {nameError ? (
            <small className="text-danger">{nameError}</small>
          ) : (
            <small className="text-muted">
              {/* Please enter your full name as per your official documents. */}
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              className="form-icon-input"
              value={registerData.email}
              onChange={handleChange}
              name="email"
            />
            <FontAwesomeIcon
              icon={faMailBulk}
              className="text-900 fs-9 form-icon"
            />
          </div>
          {emailError ? (
            <small className="text-danger">{emailError}</small>
          ) : (
            <small className="text-muted">
              {/* We'll never share your email with anyone else. */}
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="mobile">Mobile</Form.Label>
          {/* <div className="form-icon-container">
            <Form.Control
              id="mobile"
              type="number"
              placeholder="Mobile"
              className="form-icon-input"
              required
              value={registerData.phone}
              onChange={handleChange}
              name="phone"
              maxLength={13}
              minLength={10}
            />
            <FontAwesomeIcon
              icon={faPhone}
              className="text-900 fs-9 form-icon"
            />
          </div> */}
          <PhoneInput
            country={'in'}
            value={registerData.phone}
            onChange={(phone: string) => {
              setRegisterData({ ...registerData, phone });
            }}
            inputProps={{
              name: 'phone',
              required: true,
              className: 'form-control form-icon-input w-100',
              placeholder: 'Mobile',
              id: 'mobile'
            }}
          />
          {phoneError ? (
            <small className="text-danger">{phoneError}</small>
          ) : null}
        </Form.Group>
        {/* <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="mobile">Mobile</Form.Label>
          <Form.Control id="mobile" type="number" placeholder="Mobile" />
        </Form.Group> */}
        <Row className="g-3 mb-3">
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <div className="form-icon-container">
                <Form.Control
                  id="password"
                  // type="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="form-icon-input"
                  value={registerData.password}
                  onChange={handleChange}
                  name="password"
                />
                <FontAwesomeIcon
                  icon={!registerData.password ? faKey : passwordVisible ? faEyeSlash : faEye}
                  className="text-900 fs-9 form-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </div>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-password">
                    Create a strong password with at least 8 characters,
                    including uppercase and lowercase letters, numbers, and
                    special characters (!@#$%^&*). Avoid using common words or
                    sequences.
                  </Tooltip>
                }
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="text-900 fs-9 ms-2"
                />
              </OverlayTrigger>
            </Form.Group>
          </Col>
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <div className="form-icon-container">
                <Form.Control
                  id="confirmPassword"
                  // type="password"
                  type={cnfPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="form-icon-input"
                  value={registerData.confirmPassword}
                  // if changed, check if it matches password
                  onChange={onConfirmPasswordChange}
                  name="confirmPassword"
                />
                <FontAwesomeIcon
                  icon={!registerData.confirmPassword ? faKey : cnfPasswordVisible ? faEyeSlash : faEye}
                  className="text-900 fs-9 form-icon"
                  onClick={() => setCnfPasswordVisible(!cnfPasswordVisible)}
                />
              </div>
            </Form.Group>
          </Col>
          {/* Add hints:  */}
          {passwordError ? (
            <small className="text-danger">{passwordError}</small>
          ) : null}
          {confirmPasswordError ? (
            <small className="text-danger">{confirmPasswordError}</small>
          ) : null}
          {/* <Col xs={12}>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-password">
                Password must be at least 8 characters long, and must contain at
                least one uppercase letter, one lowercase letter, one number and
                one special character.
              </Tooltip>
            }
          > 
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="text-900 fs-9 ms-2"
            />
          </OverlayTrigger>
          </Col> */}
        </Row>
        <Form.Check type="checkbox" className="mb-3">
          <Form.Check.Input
            type="checkbox"
            name="termsService"
            id="termsService"
            required
            checked={registerData.termsService}
            onChange={onTermsServiceChange}
          />
          <Form.Check.Label htmlFor="termsService" className="fs-9 text-none">
            I accept the{' '}
            <a href="/terms-conditions" target="_blank">
              terms
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" target="_blank">
              privacy policy
            </a>
          </Form.Check.Label>{' '}
          <br />
          {termsServiceError ? (
            <small className="text-danger">{termsServiceError}</small>
          ) : null}
        </Form.Check>
        <div className="mb-3">
          <small className="text-success">{successMessage}</small>
        </div>
        <Button variant="primary" className="w-100 mb-3" onClick={signUp}>
          Register
        </Button>
        <div className="text-center">
          <Link to={`/auth/sign-in`} className="fs-9 fw-bold">
            Sign in to an existing account
          </Link>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
