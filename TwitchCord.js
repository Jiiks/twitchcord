/*
    TwitchCord version 1.6.1 by Jiiks
    Twitch emotes for Discord
    https://github.com/jiiks | http://jiiks.net
    24/08/2015 11:50
 */

var _browserWindow;

var baseUrl = "https://raw.githubusercontent.com/Jiiks/twitchcord/";
var masterBranchUrl = baseUrl + "master/";

//Twitch
var twitchEmotes = "emotedata.json";
var twitchEmoteUrl = "https://static-cdn.jtvnw.net/emoticons/v1/";
var twitchEmoteEnd = "/1.0";

//FrankerFaceZ
var ffzEmotes = "emotedata_ffz.json";
var ffz = true;
var ffzEmoteUrl = "https://cdn.frankerfacez.com/emoticon/";
var ffzEmoteEnd = "/1";

function TwitchCord(browserWindow) {
    _browserWindow = browserWindow;

    //Browser finished loading event
    _browserWindow.webContents.on('did-finish-load', function() {

        //Load twitch emotes from github
        xmlHttpRequest('GET', 'emotestwitch', masterBranchUrl + twitchEmotes);

        //If FrankerFaceZ is enabled then load FrankerFaceZ emotes from github
        if(ffz) {
            execJs('var ffz = true;');
            xmlHttpRequest('GET', 'emotesffz', masterBranchUrl + ffzEmotes);
        } else {
            execJs('var ffz = false;');
        }

        initCustomCss();
        initEmoteMenu();

        //Create mutation observer
        execJs('var observer = new MutationObserver(function (mutations) { mutationCallback(mutations); })');

        //Mutation callback
        execJs('function mutationCallback(mutations) { ebtnInjector(); mutations.forEach(function (mutation) { for(var i = 0 ; i < mutation.addedNodes.length ; ++i) { var next = mutation.addedNodes.item(i); processNode(next) } }) }');

        //Checks
        execJs('function processNode(node) { if(node) { var nodes = getNodes(node); for(var n in nodes) { inject(nodes[n]) } } }');

        //Node finder
        execJs('function getNodes(node) { var next; var nodes = []; var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false); while(next = walker.nextNode()) { nodes.push(next) } return nodes; }');

        //Injector 4.0
        execJs('function inject(node) { '                                                                                                                       +
                    'if(node.parentElement != null) { '                                                                                                         +
                        'var parent = node.parentElement;  '                                                                                                    +
                            'if(parent.tagName == "SPAN") { '                                                                                                   +
                                'var ph = parent.innerHTML; '                                                                                                   +
                                'var words = ph.split(" "); '                                                                                                   +
                                    'if(words != null) {  '                                                                                                     +
                                        'words.some(function(word) { '                                                                                          +
                                            'if(emotestwitch.hasOwnProperty(word)) {  '                                                                               +
                                                'ph = ph.replace(word, "<img src=' + twitchEmoteUrl + '" + emotestwitch[word] + "' + twitchEmoteEnd + '></img>"); '   +
                                            '} else if(ffz) { '                                                                                                 +
                                                'if(emotesffz.hasOwnProperty(word)) {'                                                                          +
                                                    'ph = ph.replace(word, "<img src=' + ffzEmoteUrl + '" + emotesffz[word] + "' + ffzEmoteEnd + '></img>"); '  +
                                                '}'                                                                                                             +
                                            '} '                                                                                                                +
                                        '});  '                                                                                                                 +
                                    '} '                                                                                                                        +
                                    'parent.innerHTML = ph; '                                                                                                   +
                                '} '                                                                                                                            +
                            '} '                                                                                                                                +
                        '}');

        //Start mutator
        execJs('observer.observe(document, {childList: true, subtree: true});')




    });
}

function initCustomCss() {
    execJs('var tcStyle = document.createElement("style"); tcStyle.type = "text/css"; tcStyle.innerHTML = "' +
        ' #twitchcord-button-container { position:absolute; width:50px; height:45px; right:0; top:0; display:block; } ' +
        ' #twitchcord-button { position:absolute; width:100%; height:100%; background-image:url(https://static-cdn.jtvnw.net/emoticons/v1/5/1.0); background-repeat:no-repeat; background-size:36px; background-position:7px; }' + '' +
        ' .twitchcord-button-open { background-image:url(https://static-cdn.jtvnw.net/emoticons/v1/3/1.0) !important; } ' +
        ' #emote-menu { background:#36393E; height:0; width:300px; position:absolute; bottom:45px; right:0; border:1px solid #000; border-radius: 15px 0 0 0; overflow:auto; visibility:hidden; -webkit-transition: all 1s;}' +
        ' #emote-menu-header { width:100%; height:36px; background:#212222; border-bottom:1px solid #000; }' +
        ' #emote-menu-header span { width:100%; text-align:center; display:block; line-height:36px; font-weight:bold; color:#ADADAD; }' +
        ' #emote-menu-inner { padding:10px; }' +
        ' .emote-container { display:inline-block; padding:2px; border-radius:5px; width:30px; height:30px; position:relative; }' +
        ' .emote-icon { max-width:100%; max-height:100%; position:absolute; margin:auto; top:0; right:0; bottom:0; left:0; cursor:pointer; }' +
        ' .emote-container:hover { background: rgba(123,123,123,0.35); }' +
        ' .emotemenu-open { height:450px !important; visibility:visible !important; }' +
        '"; document.getElementsByTagName("head")[0].appendChild(tcStyle);');
}

function initEmoteMenu() {
    //Emote Menu
    execJs('var emoteMenu = document.createElement("div"); emoteMenu.setAttribute("id", "emote-menu");');
    //Emote Button
    execJs('var tcordbtncontainer = document.createElement("div"); tcordbtncontainer.setAttribute("id", "twitchcord-button-container");');
    execJs('var tcordbtn = document.createElement("button"); tcordbtn.setAttribute("id", "twitchcord-button"); tcordbtn.setAttribute("onclick", "return false;"); tcordbtncontainer.appendChild(tcordbtn);');
    execJs('var menuopen = false; tcordbtn.addEventListener("click", function(e) { menuopen = !menuopen; if(menuopen) { emoteMenu.className = "emotemenu-open"; tcordbtn.className = "twitchcord-button-open"; } else { emoteMenu.className = ""; tcordbtn.className = ""; }; return false; });')

    //Emote Header
    execJs('var emoteHeader = document.createElement("div"); emoteHeader.setAttribute("id", "emote-menu-header"); var emoteHeaderSpan = document.createElement("span"); emoteHeaderSpan.innerHTML = "Global Emotes"; emoteHeader.appendChild(emoteHeaderSpan); ');
    //Emote Container
    execJs('var emoteMenuInner = document.createElement("div"); emoteMenuInner.setAttribute("id", "emote-menu-inner");');
    //Append
    execJs('emoteMenu.appendChild(emoteHeader); emoteMenu.appendChild(emoteMenuInner); tcordbtncontainer.appendChild(emoteMenu);');
    //Insert emote function
    execJs('function appendEmote(emote) { var ta = document.getElementsByClassName("channel-textarea-inner")[0].getElementsByTagName("textarea")[0]; ta.value = ta.value.slice(-1) == " " ? ta.value + emote : ta.value + " " + emote;  }');


    //Emote time
    var twitchEmotes = {":(":2, ":)": 1, ":/":10, ":D":3, ":o":8, ":p":12, ":z":5, ";)":11, ";p":13, "<3":9, ">(":4, "B)":7, "o_o":6, "R)":14,"4Head":354,"ANELE":3792,"ArgieB8":51838,"ArsonNoSexy":50,"AsianGlow":74,"AtGL":9809,"AthenaPMS":32035,"AtIvy":9800,"AtWW":9801,"BabyRage":22639,"BatChest":1905,"BCWarrior":30,"BibleThump":86,"BigBrother":1904,"BionicBunion":24,"BlargNaut":38,"BloodTrail":69,"BORT":243,"BrainSlug":881,"BrokeBack":4057,"BuddhaBar":27602,"CoolCat":58127,"CorgiDerp":49106,"CougarHunt":21,"DAESuppy":973,"DansGame":33,"DatHass":20225,"DatSheffy":170,"DBstyle":73,"deExcite":46249,"deIlluminati":46248,"DendiFace":58135,"DogFace":1903,"DOOMGuy":54089,"EagleEye":20,"EleGiggle":4339,"EvilFetus":72,"FailFish":360,"FPSMarksman":42,"FrankerZ":65,"FreakinStinkin":39,"FUNgineer":244,"FunRun":48,"FuzzyOtterOO":168,"GasJoker":9802,"GingerPower":32,"GrammarKing":3632,"HassanChop":68,"HeyGuys":30259,"HotPokket":357,"HumbleLife":46881,"ItsBoshyTime":169,"Jebaited":90,"JKanStyle":15,"JonCarnage":26,"KAPOW":9803,"Kappa":25,"KappaPride":55338,"Keepo":1902,"KevinTurtle":40,"Kippa":1901,"Kreygasm":41,"KZskull":5253,"Mau5":30134,"mcaT":35063,"MechaSupes":9804,"MrDestructoid":28,"MVGame":29,"NightBat":9805,"NinjaTroll":45,"NoNoSpot":44,"NotATK":34875,"NotLikeThis":58765,"OMGScoots":91,"OneHand":66,"OpieOP":356,"OptimizePrime":16,"OSbeaver":47005,"OSbury":47420,"OSdeo":47007,"OSfrog":47008,"OSkomodo":47010,"OSrob":47302,"OSsloth":47011,"panicBasket":22998,"PanicVis":3668,"PazPazowitz":19,"PeoplesChamp":3412,"PermaSmug":27509,"PicoMause":27,"PipeHype":4240,"PJHarley":9808,"PJSalt":36,"PMSTwin":92,"PogChamp":88,"Poooound":358,"PraiseIt":38586,"PRChase":28328,"PunchTrees":47,"PuppeyFace":58136,"RaccAttack":27679,"RalpherZ":1900,"RedCoat":22,"ResidentSleeper":245,"RitzMitz":4338,"RuleFive":361,"ShadyLulu":52492,"Shazam":9807,"shazamicon":9806,"ShazBotstix":87,"ShibeZ":27903,"SMOrc":52,"SMSkull":51,"SoBayed":1906,"SoonerLater":355,"SriHead":14706,"SSSsss":46,"StoneLightning":17,"StrawBeary":37,"SuperVinlin":31,"SwiftRage":34,"tbBaconBiscuit":44499,"tbChickenBiscuit":56879,"tbQuesarito":56883,"tbSausageBiscuit":56881,"tbSpicy":56882,"tbSriracha":56880,"TF2John":1899,"TheKing":50901,"TheRinger":18,"TheTarFu":70,"TheThing":7427,"ThunBeast":1898,"TinyFace":67,"TooSpicy":359,"TriHard":171,"TTours":38436,"UleetBackup":49,"UncleNox":3666,"UnSane":71,"VaultBoy":54090,"Volcania":166,"WholeWheat":1896,"WinWaker":167,"WTRuck":1897,"WutFace":28087,"YouWHY":4337};

    for(var emote in twitchEmotes) {
        var emoteCommand = emote;
        var emoteId = twitchEmotes[emote];

        execJs('var emoteCommand = document.createElement("div"); emoteCommand.className = "emote-container"; var emoteId = document.createElement("img"); emoteId.className = "emote-icon"; emoteId.addEventListener("click", function(e) { appendEmote("'+emoteCommand+'"); });  emoteId.src = "' + twitchEmoteUrl + emoteId + twitchEmoteEnd + '"; emoteCommand.appendChild(emoteId); emoteMenuInner.appendChild(emoteCommand); ');



    }

    //Emote menu injector
    execJs('function ebtnInjector() { var cta = document.getElementsByClassName("channel-textarea")[0]; if(cta == undefined) return; cta.appendChild(tcordbtncontainer); }');

}

function execJs(js) {
    _browserWindow.webContents.executeJavaScript(js);
}

function xmlHttpRequest(type, variable, url) {
    var varreq = "request" + variable;
    execJs('var ' + variable + '; ' +
        'var '+varreq+' = new XMLHttpRequest(); ' 	+
        '' + varreq + '.open("'+type+'", "'+url+'", true); '	+
        '' + varreq + '.onload = function() { ' + variable + ' = JSON.parse('+varreq+'.responseText); }; ' +
        ''+varreq+'.send();');
}


exports.TwitchCord = TwitchCord;