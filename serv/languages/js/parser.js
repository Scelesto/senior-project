(function(){
	Object.defineProperties(Object.prototype,{
		extend:{value:function(child){
			var parent=this.valueOf(),constructor=Array.prototype.slice.call(arguments,1);
			return function(){
				parent.apply(this,constructor);
				child.apply(this,arguments);
			}
		}},
		loc:{value:function(location,item){
			if(location.constructor==String){location=location.split('/')}
			var tmp=this.valueOf(),here=tmp,l=location.length-1;
			for(var i=0;i<l;i++){
				here=here[location[i]];
				if(here.constructor==Function){
					here();
				}
			}
			if(typeof(item)=='undefined'){
				return l==-1?here:here[location[l]]
			}
			here[location[l]]=item;
			return tmp;
		}},
		root_search:{value:function(value){
			for(i in this){
				if(this[i]==value||([Object,Array].indexOf(this[i].constructor)!=-1&&this[i].root_search(value))){
					return true
				}
			}
			return false
		}}
	});
	Object.defineProperty(Array.prototype,'del',{value:function(index){
		delete this[index];
		var ret=[]
		for(var i=0;i<this.length;i++){
			if(typeof(this[i])!='undefined'){
				ret.push(this[i])
			}
		}
		return ret;
	}});
	window['prs']=function(input){
		var special=/["'`.\/&|();:=[\]{}!+\-*?%<>~^\s]/,
		finish=/[.&|:=*?%<>)\]}^]/,
		varname=/[^0-9!@#][^!@#]*/,
		operators={
			assignment:[
				"=",
				"+=",
				"-=",
				"*=",
				"/=",
				"%=",
				"<<=",
				">>=",
				">>>=",
				"&=",
				"^=",
				"|="
			],
			equality:[
				"==",
				"!=",
				"===",
				"!=="
			],
			relational:[
				">",
				">=",
				"<",
				"<="
			],
			unary:[
				"++",
				"--",
				"+",
				"-"
			],
			add:[
				"+",
				"-"
			],
			arithmetic:[
				"%",
				"/",
				"*"
			],
			bitunary:[
				"~"
			],
			bitshift:[
				"<<",
				">>",
				">>>"
			],
			bitwise:[
				"&",
				"^",
				"|"
			],
			logunary:[
				"!"
			],
			logical:[
				"&&",
				"||"
			],
			ternary:[
				['?',':']
			],
			comma:[
				","
			],
			stringincrement:[
				"delete",
				"typeof",
				"void"
			],
			stringrelational:[
				"in",
				"of",
				"instanceof"
			],
			member:[
				"."
			],
			instance:[
				"new"
			]
		},orderofoperations={
			0:["member"],
			1:["instance"],
			2:["stringincrement","unary","logunary","bitunary"],
			3:["arithmetic"],
			4:["add"],
			5:["bitshift"],
			6:["relational","stringrelational"],
			7:["equality"],
			8:["bitwise"],
			9:["logical"],
			10:["ternary"],
			11:["assignment"],
			12:["comma"]
		},housing={
			call:["(",")"],
			block:["{","}"],
			member:["[","]"]
		},statement=[
			'throw',
			'delete',
			'void',
			'typeof',
			'instanceof',
			'break',
			'continue',
			'var',
			'if',
			'else',
			'for',
			'do',
			'while',
			'switch',
			'case',
			'default',
			'try',
			'catch',
			'finally',
			'let',
			'const',
			'function',
			'function*',
			'yield',
			'yield*',
			'return',
			'class',
			'extends',
			'each',
			'debugger',
			'export',
			'import',
			'from',
			'as',
			'with'
		],datatypes={
			string:{
				inclusive:false,
				separt:false,
				start:/["']/,
				end:/["']/,
				reg:/^"((\\"|[^"])*(\\"|[^"\\]))?"$|^'((\\'|[^'])*(\\'|[^\\']))?'$/
			},
			number:{
				inclusive:false,
				start:/[0-9]/,
				end:/[0-9]/,
				reg:/^[0-9]+$|^[0-9]+e[0-9]+$/
			},
			regexp:{
				inclusive:false,
				start:/\//,
				end:/[\/gim]/,
				reg:/^\/(\\\/|[^\/]|\[((\\\[|[^\[])*(\\\[|[^\\\[]))?\])*(\\\/|[^\\\/])\/[gim]{0,3}$/
			},
			object:{
				inclusive:true,
				start:/{/,
				end:/}/,
				reg:/^{.*}$/,
				internal:{
					housing:false,
					format:true,
					multiple:false,
					serv:false,
					form:"$A:$B[,$A:$B]?,?",
					A:['string','variable'],
					B:['data']
				}
			},
			array:{
				inclusive:true,
				start:/\[/,
				end:/\]/,
				reg:/^\[.*\]$/,
				internal:{
					housing:false,
					format:true,
					multiple:false,
					serv:false,
					form:"$A[,$A]?,?",
					A:['data']
				}
			},
			template_string:{
				inclusive:true,
				start:/`/,
				end:/`/,
				reg:/^`(((\\`|[^`])*(\${.*})?\3*)*(\\`|[^`\\]))?`$/,
				internal:{
					housing:true,
					format:false,
					multiple:true,
					serv:true,
					start:/\$\{/,
					end:/\}/,
					service:["block"]
				}
			}
		},fill='null/nextlevel',TERMINAL=function(char){
			this.char=char;
			var guess,child,opMult,data;
			this.exists=true;
			switch(this.char){
				case '"':
					//beginning of string
					//end of string
					//quoted
					break;
				case "'":
					data={
						isDatatype:'data/string'
					};
					//beginning of string
					//end of string
					//quoted
					break;
				case '`':
					//beginning of string
					//end of string
					//quoted
					break;
				case '.':
					guess={
						type:'operator/member/0',
						ind:fill
					};
					child=[
						{
							ind:'attribute'
						}
					];
					//object member
					//quoted
					break;
				case '/':
					//regular expression
					//assignment
					//arithmetic
					//comment
					//quoted
					break;
				case '&':
					//assignment
					//bitwise
					//logical
					//quoted
					break;
				case '|':
					//assignment
					//bitwise
					//logical
					//quoted
					break;
				case '(':
					//declare function(){}
					//declare function x(){}
					//call function();
					//declare group
					//quoted
					break;
				case ')':
					//declare function(){}
					//declare function x(){}
					//call function();
					//declare group
					//quoted
					break;
				case ';':
					//end statement
					//quoted
					break;
				case ':':
					//ternary
					//label
					//quoted
					break;
				case '=':
					guess=false;
					opMult=true;
					data={
						allCats:['assignment','equality','relational'],
						first:['assignment','equality'],
						after:['assignment','equality','relational'],
						opEndChars:['=']
					}
					//assignment
					//equality
					//relational
					//quoted
					break;
				case '[':
					//object member
					//create array
					//quoted
					break;
				case ']':
					//object member
					//create array
					//quoted
					break;
				case '{':
					//declare function(){}
					//declare function x(){}
					//block
					//create object
					//quoted
					break;
				case '}':
					//declare function(){}
					//declare function x(){}
					//block
					//create object
					//quoted
					break;
				case '!':
					//equality
					//logunary
					//quoted
					break;
				case '+':
					//assignment
					//unary
					//add
					//quoted
					break;
				case '-':
					//assignment
					//unary
					//add
					//quoted
					break;
				case '*':
					//assignment
					//arithmetic
					//statement
					//comment
					//quoted
					break;
				case '?':
					//ternary
					//quoted
					break;
				case '%':
					//assignment
					//arithmetic
					//quoted
					break;
				case '<':
					//assignment
					//relational
					//bitshift
					//quoted
					break;
				case '>':
					//assignment
					//relational
					//bitshift
					//quoted
					break;
				case '~':
					//bitunary
					//quoted
					break;
				case '^':
					//assignment
					//bitwise
					//quoted
					break;
				case ' ':
					//end of something
					//quoted
					break;
				case '\n':
					//end of something
					//quoted
					break;
				default:
					this.exists=false;
					break;
			}
			this.guess=guess?guess:false;
			this.child=child?child:false;
			this.opMult=opMult?opMult:false;
			this.data=data?data:false;
		},types_raw={
			data:{
				pure:false
				//traditional or special
			},
			operator:{
				pure:false
				//how many operators
				//how many characters
			},
			args:{
				pure:false,
				call:{
					//commaset parser
				},
				declare:{
					//commaset parser
				}
			},
			housing:{
				pure:false
				//how many blocks
			},
			statement:{
				pure:false
				//treat as function or exception
			},
			attribute:{
				pure:function(){
					return {type:'attribute',value:buffer,do:fill}
				},
				//string or literal
			}
		},code=[],location=[],here,t,buffer="",term,i=0,j,house,old,E,actions={
			traditional:function(o){
				location.push(house);
				code=code.loc(location,o.valueOf());
				buffer="";
			}
		},loc_refresh=function(){
			here=code.loc(location);
			house=false;
			//if adding code to array
			if(here.constructor==Array){
				house=here.length;
			}else{
				for(j in here){
					if(here[j]==fill){
						if(house!=false){
							//more than one option
							//return
						}else{
							house=j;
						}
					}
				}
			}
			if(house===false){
				//no hint, retreat down to data closest to housing level and do stuff there, or else block off data
			}else{
				E=actions['traditional'];
				return general();
			}
		},retreat=function(){
			while(code.loc(location).constructor!=Array){
				location=location.del(location.length-1);
			}
		},deal_with_buffer=function(){
			//variable
			if(varname.test(buffer)&&!special.test(buffer)){
				if(statement.indexOf(buffer)==-1){
					E({type:'data/variable',value:buffer,do:fill});
					return true;
				}else{
					//it's a statement
				}
			}
			//number
			if(datatypes.number.reg.test(buffer)){
				E({type:'data/number',value:buffer,do:fill});
				return true;
			}
			//operator
			opTestRoot=(new TERMINAL(buffer[0]));
			opTestRoot=opTestRoot.exists?opTestRoot:{};
			if(opTestRoot.opMult){
				if(special.test(input[i])&&opTestRoot.data.opEndChars.indexOf(input[i])!=-1){
					if(opTest(buffer+input[i])!==false){
						buffer+=input[i];
						return false;
					}
				}
				//ok, so it wasn't that character.  actually test it now.
				var foundOperator=opTest(buffer);
				if(foundOperator!==false){
					E({type:'operator/'+foundOperator,ind:fill});
					return true;
				}
			}
		},opTestRoot,opTest=function(potOp){
			for(var o=opTestRoot.data.first,j=0;j<o.length;j++){
				for(var opType=operators[o[j]],k=0;k<opType.length;k++){
					if(opType[k]==potOp){
						return o[j]+'/'+k;
					}
				}
			}
			return false;
		},general=function(){
			if(code.length>0){
				t=here.type?here.type.split('/'):false;
				//if datatype
				if(house!='do'&&t&&t[0]=='data'&&datatypes[t[1]]){
					var handler=datatypes[t[1]];
					if(handler.inclusive==false){
						while(i<input.length){
							buffer+=input[i];
							if(
								handler.end.test(input[i])
								&&handler.reg.test(buffer)
								&&!(input[i+1]&&handler.reg.test(buffer+input[i+1]))
							){
								if(handler.separt===false){
									buffer=buffer.substr(1,buffer.length-2);
								}
								location.push('value');
								code=code.loc(location,buffer);
								location[location.length-1]='do';
								code=code.loc(location,fill);
								location=location.del(location.length-1);
								buffer="";
								break;
							}
							++i;
						}
						return;
					}else{
						//deal with treatment
						//return
						//deal with "do"
					}
				}
			}
			if(input[i]==';'){
				if(buffer!=""&&deal_with_buffer()){return loc_refresh()}
				E('return');
				retreat();
				return true;
			}
			if(special.test(input[i])){
				if(buffer!=""&&term&&term.child){
					if(term.child.length==1){
						var rawtype=types_raw[term.child[0][house]];
						if(rawtype.pure.constructor==Function){
							E(rawtype.pure());
							term=false;
							return loc_refresh();
						}
					}
				}
				term=new TERMINAL(input[i]);
				if(term.guess){
					if(deal_with_buffer()){return loc_refresh()}
					E(term.guess);
				}
				if(buffer==""&&term.opMult){
					buffer+=input[i];
				}else{
					if(deal_with_buffer()){return loc_refresh()}
				}
				var td=term.data;
				if(td&&td.isDatatype){
					E({type:td.isDatatype,value:fill});
					buffer+=input[i];
				}
			}else{
				if(special.test(buffer)){
					deal_with_buffer();
				}
				buffer+=input[i];
			}
		};
		//MAKE LONG FORM OBJECT
		for(;i<input.length;++i){
			loc_refresh();
		}
		//CHECK FOR ERRORS
		if(code.root_search(fill)){
			return false;
		}
		return code;
		//RUN CONVERSIONS ON LFO
			//ATTRIBUTE ADDITION
			//ORDER OF OPERATIONS
		//MAKE XML PSEUDOCODE
		//OUTPUT OR SEND TO SERVER
	}
})();