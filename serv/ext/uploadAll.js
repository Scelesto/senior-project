var uploads={
	ajax:function(files,dest){
		
	},
	iframe:function(e){ //e is the form id
		var n,t=document.createElement("iframe");t.style.display="none",t.src=window.location.href.replace(/[^#?]*\//,""),document.body.appendChild(t),n=document.getElementsByTagName("iframe")[0],n.onload=function(){var t=document.getElementById(e),o=n.contentDocument,a=o.getElementById(e);t.parentNode.replaceChild(t.cloneNode(!0),t),a.parentNode.replaceChild(t,a),o.getElementsByTagName("form")[0].submit(),n.onload=function(){}}
	}
};
function upload(){
	if(!window.FormData){}
}