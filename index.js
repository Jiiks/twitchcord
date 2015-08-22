/*Simplify*/
function execJs(js) {
  mainWindow.webContents.executeJavaScript(js);
}

mainWindow.webContents.on('did-finish-load', function() {
		
		/* TwitchEmotes 'plugin' v1.5 by Jiiks
		 * https://github.com/Jiiks | http://jiiks.net
		 */
		

		//Load emotes from github
		execJs('var emotes;');
		execJs('var request = new XMLHttpRequest();');
		execJs('request.open("GET", "https://raw.githubusercontent.com/Jiiks/twitchcord/master/emotedata.json", true);');
		execJs('request.onload = function() { emotes = JSON.parse(request.responseText); };');
		execJs('request.send();');

		//Create mutation observer
		execJs('var observer = new MutationObserver(function (mutations) { mutationCallback(mutations); })');
		
		//Mutation callback
		execJs('function mutationCallback(mutations) { mutations.forEach(function (mutation) { for(var i = 0 ; i < mutation.addedNodes.length ; ++i) { var next = mutation.addedNodes.item(i); processNode(next) } }) }');

		//Checks
		execJs('function processNode(node) { if(node) { var nodes = getNodes(node); for(var n in nodes) { inject(nodes[n]) } } }');
		
		//Node finder
		execJs('function getNodes(node) { var next; var nodes = []; var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false); while(next = walker.nextNode()) { nodes.push(next) } return nodes; }');
		
		//Injector 3.0
		execJs('function inject(node) { if(node.parentElement != null) { var parent = node.parentElement; if(parent.tagName == "SPAN") { var ph = parent.innerHTML; var words = ph.split(" "); if(words != null) {  words.some(function(word) { if(emotes.hasOwnProperty(word)) {  ph = ph.replace(word, "<img src=https://static-cdn.jtvnw.net/emoticons/v1/" + emotes[word] + "/1.0></img>"); } });  } parent.innerHTML = ph; } } }');
		//Start mutator
		execJs('observer.observe(document, {childList: true, subtree: true});');
		execJs('console.log("finished loading")');
		
	});