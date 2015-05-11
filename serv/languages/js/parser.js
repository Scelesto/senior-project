(function(){
	Object.defineProperties(Object.prototype,{
		extend:{value:function(child){
			var parent=this,constructor=Array.prototype.slice.call(arguments,1);
			return function(){
				parent.apply(this,constructor);
				child.apply(this,arguments);
			}
		}},
		insert:{value:function(item,location){
			var here=this;
			for(var i=0;i<location.length;i++){
				here=here[location[i]];
			}
			here.push(item);
			return this;
		}}
	});
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
				start:/["']/,
				end:/["']/,
				reg:/"((\\"|[^"])*(\\"|[^"\\]))?"|'((\\'|[^'])*(\\'|[^\\']))?'/
			},
			number:{
				inclusive:false,
				start:/[0-9]/,
				end:/[0-9]/,
				reg:/[0-9]*|[0-9]+e[0-9]+/
			},
			regexp:{
				inclusive:false,
				start:/\//,
				end:/[\/gim]/,
				reg:/\/(\\\/|[^\/]|\[((\\\[|[^\[])*(\\\[|[^\\\[]))?\])*(\\\/|[^\\\/])\/[gim]{0,3}/
			},
			object:{
				inclusive:true,
				start:/{/,
				end:/}/,
				reg:/{.*}/,
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
				reg:/\[.*\]/,
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
				reg:/`(((\\`|[^`])*(\${.*})?\3*)*(\\`|[^`\\]))?`/,
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
			var guess,child;
			switch(char){
				case '"':
					//beginning of string
					//end of string
					//quoted
					break;
				case "'":
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
					guess=[{
						type:'operator/member/0',
						ind:fill
					}];
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
			}
			this.guess=guess;
			this.child=child;
		},types_raw={
			data:{
				//traditional or special
			},
			operator:{
				//how many operators
				//how many characters
			},
			args:{
				call:{
					//commaset parser
				},
				declare:{
					//commaset parser
				}
			},
			housing:{
				//how many blocks
			},
			statement:{
				//treat as function or exception
			},
			attribute:{
				//string or literal
			}
		},code=[],location=[],here,t,buffer="",term,i=0,j,obj_proto,house,made_entry,E=function(o){
			obj_proto=o;
			made_entry=true;
		};
		//MAKE LONG FORM OBJECT
		for(;i<input.length;++i){
			made_entry=false;
			here=code;
			if(code.length>0){
				for(j=0;j<location.length;++j){
					here=here[location[j]];
				}
				t=here.type?here.type.split('/'):false;
				//if inclusive datatype
				if(t&&t[0]=='data'&&datatypes[t[1]].inclusive==false){
					//wait for end and match
					continue;
				}
				house=false;
				//if adding code to array
				if(here.constructor==Array){
					house=here.length;
				}else{
					for(j in here){
						if(here[j]==fill){
							if(house!=false){
								//more than one option
							}else{
								house=j;
							}
						}
					}
				}
				if(house==false){
					//no hint, retreat down to data closest to housing level and do stuff there, or else block off data
				}
			}
			if(special.test(input[i])){
				term=new TERMINAL(input[i]);
				if(term.guess.length==1){
					tmp=term.guess[0];
					if(varname.test(buffer)){
						if(statement.indexOf(buffer)==-1){
							E({type:'data/variable',value:buffer,do:tmp});
						}else{
							//it's a statement
						}
					}
				}
				if(true/*you successfully make a prototype*/){
					location.push(house);
					code=code.insert(obj_proto,location);
					buffer="";
				}
			}
			buffer+=input[i];
		}
		console.log(code);
		//MAKE XML PSEUDOCODE
		//SEND TO SERVER
	}
})();