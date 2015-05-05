(function(){
	Object.defineProperty(Object.prototype,"extend",{value:function(child){
		var parent=this,constructor=Array.prototype.slice.call(arguments,1);
		return function(){
			parent.apply(this,constructor);
			child.apply(this,arguments);
		}
	}});
	window['prs']=function(input){
		var special=/["'`.\/&|();:=[\]{}!+\-*?%<>~^\s]/,
		finish=/[.&|:=*?%<>)\]}^]/,
		varname=/[^0-9!@#][^@#]*/,
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
		},code=[],buffer="",i=0,
		TERMINAL=function(char){
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
		}
		for(;i<input.length;++i){
			if(special.test(input[i])){
				console.log(special,finish,varname,operators,orderofoperations,housing,statement,datatypes);
			}else{
				buffer+=input[i];
			}
		}
	}
})();