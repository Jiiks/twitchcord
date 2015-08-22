  /*Simplify*/
  function execJs(js) {
	  mainWindow.webContents.executeJavaScript(js);
  }

  function launchMainAppWindow(isVisible) {
    var mainWindowOptions = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      'min-width': MIN_WIDTH,
      'min-height': MIN_HEIGHT,
      transparent: false,
      frame: false,
      resizable: true,
      show: isVisible
    };

    loadWindowConfig(mainWindowOptions);

    mainWindow = new _BrowserWindow2['default'](mainWindowOptions);
    mainWindow.webContents.on('new-window', function (e, windowURL) {
      e.preventDefault();
      _shell2['default'].openExternal(windowURL);
    });

    mainWindow.loadUrl('' + WEBAPP_ENDPOINT + '' + appPath + '?_=' + Date.now());

    contextMenu = new _ContextMenu2['default'](mainWindow);
	
	mainWindow.webContents.on('did-finish-load', function() {
		
		/* TwitchEmotes 'plugin' v1.3 by Jiiks
		 * https://github.com/Jiiks | http://jiiks.net
		 */
		
		//Emotes array
		execJs('var emotes = {"emotes": { "4Head":{ "image_id":354 }, "ANELE":{ "image_id":3792 },"ArgieB8":{"image_id":51838},"ArsonNoSexy":{"image_id":50},"AsianGlow":{"image_id":74},"AtGL":{"image_id":9809},"AthenaPMS":{"image_id":32035},"AtIvy":{"image_id":9800},"AtWW":{"image_id":9801},"BabyRage":{"image_id":22639},"BatChest":{"image_id":1905},"BCWarrior":{"image_id":30},"BibleThump":{"image_id":86},"BigBrother":{"image_id":1904},"BionicBunion":{"image_id":24},"BlargNaut":{"image_id":38},"BloodTrail":{"image_id":69},"BORT":{"image_id":243},"BrainSlug":{"image_id":881},"BrokeBack":{"image_id":4057},"BuddhaBar":{"image_id":27602},"CoolCat":{"image_id":58127},"CorgiDerp":{"image_id":49106},"CougarHunt":{"image_id":21},"DAESuppy":{"image_id":973},"DansGame":{"image_id":33},"DatHass":{"image_id":20225},"DatSheffy":{"image_id":170},"DBstyle":{"image_id":73},"deExcite":{"image_id":46249},"deIlluminati":{"image_id":46248},"DendiFace":{"image_id":58135},"DogFace":{"image_id":1903},"DOOMGuy":{"image_id":54089},"EagleEye":{"image_id":20},"EleGiggle":{"image_id":4339},"EvilFetus":{"image_id":72},"FailFish":{"image_id":360},"FPSMarksman":{"image_id":42},"FrankerZ":{"image_id":65},"FreakinStinkin":{"image_id":39},"FUNgineer":{"image_id":244},"FunRun":{"image_id":48},"FuzzyOtterOO":{"image_id":168},"GasJoker":{"image_id":9802},"GingerPower":{"image_id":32},"GrammarKing":{"image_id":3632},"HassanChop":{"image_id":68},"HeyGuys":{"image_id":30259},"HotPokket":{"image_id":357},"HumbleLife":{"image_id":46881},"ItsBoshyTime":{"image_id":169},"Jebaited":{"image_id":90},"JKanStyle":{"image_id":15},"JonCarnage":{"image_id":26},"KAPOW":{"image_id":9803},"Kappa":{"image_id":25},"KappaPride":{"image_id":55338},"Keepo":{"image_id":1902},"KevinTurtle":{"image_id":40},"Kippa":{"image_id":1901},"Kreygasm":{"image_id":41},"KZskull":{"image_id":5253},"Mau5":{"image_id":30134},"mcaT":{"image_id":35063},"MechaSupes":{"image_id":9804},"MrDestructoid":{"image_id":28},"MVGame":{"image_id":29},"NightBat":{"image_id":9805},"NinjaTroll":{"image_id":45},"NoNoSpot":{"image_id":44},"NotATK":{"image_id":34875},"NotLikeThis":{"image_id":58765},"OMGScoots":{"image_id":91},"OneHand":{"image_id":66},"OpieOP":{"image_id":356},"OptimizePrime":{"image_id":16},"OSbeaver":{"image_id":47005},"OSbury":{"image_id":47420},"OSdeo":{"image_id":47007},"OSfrog":{"image_id":47008},"OSkomodo":{"image_id":47010},"OSrob":{"image_id":47302},"OSsloth":{"image_id":47011},"panicBasket":{"image_id":22998},"PanicVis":{"image_id":3668},"PazPazowitz":{"image_id":19},"PeoplesChamp":{"image_id":3412},"PermaSmug":{"image_id":27509},"PicoMause":{"image_id":27},"PipeHype":{"image_id":4240},"PJHarley":{"image_id":9808},"PJSalt":{"image_id":36},"PMSTwin":{"image_id":92},"PogChamp":{"image_id":88},"Poooound":{"image_id":358},"PraiseIt":{"image_id":38586},"PRChase":{"image_id":28328},"PunchTrees":{"image_id":47},"PuppeyFace":{"image_id":58136},"RaccAttack":{"image_id":27679},"RalpherZ":{"image_id":1900},"RedCoat":{"image_id":22},"ResidentSleeper":{"image_id":245},"RitzMitz":{"image_id":4338},"RuleFive":{"image_id":361},"ShadyLulu":{"image_id":52492},"Shazam":{"image_id":9807},"shazamicon":{"image_id":9806},"ShazBotstix":{"image_id":87},"ShibeZ":{"image_id":27903},"SMOrc":{"image_id":52},"SMSkull":{"image_id":51},"SoBayed":{"image_id":1906},"SoonerLater":{"image_id":355},"SriHead":{"image_id":14706},"SSSsss":{"image_id":46},"StoneLightning":{"image_id":17},"StrawBeary":{"image_id":37},"SuperVinlin":{"image_id":31},"SwiftRage":{"image_id":34},"tbBaconBiscuit":{"image_id":44499},"tbChickenBiscuit":{"image_id":56879},"tbQuesarito":{"image_id":56883},"tbSausageBiscuit":{"image_id":56881},"tbSpicy":{"image_id":56882},"tbSriracha":{"image_id":56880},"TF2John":{"image_id":1899},"TheKing":{"image_id":50901},"TheRinger":{"image_id":18},"TheTarFu":{"image_id":70},"TheThing":{"image_id":7427},"ThunBeast":{"image_id":1898},"TinyFace":{"image_id":67},"TooSpicy":{"image_id":359},"TriHard":{"image_id":171},"TTours":{"image_id":38436},"UleetBackup":{"image_id":49},"UncleNox":{"image_id":3666},"UnSane":{"image_id":71},"VaultBoy":{"image_id":54090},"Volcania":{"image_id":166},"WholeWheat":{"image_id":1896},"WinWaker":{"image_id":167},"WTRuck":{"image_id":1897},"WutFace":{"image_id":28087},"YouWHY":{"image_id":4337}} }');

		//Create mutation observer
		execJs('var observer = new MutationObserver(function (mutations) { mutationCallback(mutations); })');
		
		//Mutation callback
		execJs('function mutationCallback(mutations) { mutations.forEach(function (mutation) { for(var i = 0 ; i < mutation.addedNodes.length ; ++i) { var next = mutation.addedNodes.item(i); processNode(next) } }) }');

		//Checks
		execJs('function processNode(node) { if(node) { var nodes = getNodes(node); for(var n in nodes) { inject(nodes[n]) } } }');
		
		//Node finder
		execJs('function getNodes(node) { var next; var nodes = []; var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false); while(next = walker.nextNode()) { nodes.push(next) } return nodes; }');

		//Injector 2.0
		execJs('function inject(node) { if(node.parentElement != null) { var parent = node.parentElement; if(parent.tagName == "SPAN") { var ph = parent.innerHTML; for(var e in emotes.emotes) { if(ph.indexOf(e) !== -1) { var re = new RegExp(e, "g"); ph = ph.replace(re, "<img src=https://static-cdn.jtvnw.net/emoticons/v1/" + emotes.emotes[e].image_id + "/1.0></img>") } } parent.innerHTML = ph; } } }');
		//Start mutator
		execJs('observer.observe(document, {childList: true, subtree: true});');
		
	});