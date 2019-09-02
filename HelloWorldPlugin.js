const path = require("path");
var fs = require("fs");

let keywordMap = {
	Обећање: "Promise",
	асинхрона: "async",
	одложи: "setTimeout",
	сачекај: "await",
	онда: "then",
	ухвати: "catch",
	пробај: "try",
	празно: "null",
	заСваки: "forEach",
	недефинисано: "undefined",
	Математика: "Math",
	насумично: "random",
	функција: "function",
	класа: "class",
	наслеђује: "extends",
	конструктор: "constructor",
	врати: "return",
	испиши: "alert",
	константа: "const",
	"дај да": "let",
	ово: "this",
	буде: "=",
	дохвати: "fetch",
	пробај: "try",
	баци: "throw",
	Грешку: "Error",
	гурни: "push",
	споји: "join",
	"добија вредност": "=",
	"повећај за": "+=",
	"увећај за": "+=",
	"умањи за": "-=",
	нетачно: "false",
	тачно: "true",
	"није једнако": "!=",
	није: "!",
	"мањи од": "<",
	"мање од": "<",
	"већи од": ">",
	"веће од": ">",
	постаје: "=",
	једнако: "=",
	Низ: "Array",
	процеди: "filter",
	дужина: "length",
	нови: "new",
	нова: "new",
	ново: "new",
	нову: "new",
	пута: "*",
	за: "for",
	док: "while",
	ако: "if",
	"у супрoтном": "else",
	или: "||",
	и: "&&",
	увучи: "import"
};

var transliterate = function(text) {
	text = text
		.replace(/\u0401/g, "YO")
		.replace(/\u0419/g, "I")
		.replace(/\u0426/g, "TS")
		.replace(/\u0423/g, "U")
		.replace(/\u041A/g, "K")
		.replace(/\u0415/g, "E")
		.replace(/\u041D/g, "N")
		.replace(/\u0413/g, "G")
		.replace(/\u0428/g, "SH")
		.replace(/\u0429/g, "SCH")
		.replace(/\u0417/g, "Z")
		.replace(/\u0425/g, "H")
		.replace(/\u042A/g, "")
		.replace(/\u0451/g, "yo")
		.replace(/\u0439/g, "i")
		.replace(/\u0446/g, "ts")
		.replace(/\u0443/g, "u")
		.replace(/\u043A/g, "k")
		.replace(/\u0435/g, "e")
		.replace(/\u043D/g, "n")
		.replace(/\u0433/g, "g")
		.replace(/\u0448/g, "sh")
		.replace(/\u0449/g, "sch")
		.replace(/\u0437/g, "z")
		.replace(/\u0445/g, "h")
		.replace(/\u044A/g, "'")
		.replace(/\u0424/g, "F")
		.replace(/\u042B/g, "I")
		.replace(/\u0412/g, "V")
		.replace(/\u0410/g, "a")
		.replace(/\u041F/g, "P")
		.replace(/\u0420/g, "R")
		.replace(/\u041E/g, "O")
		.replace(/\u041B/g, "L")
		.replace(/\u0414/g, "D")
		.replace(/\u0416/g, "ZH")
		.replace(/\u042D/g, "E")
		.replace(/\u0444/g, "f")
		.replace(/\u044B/g, "i")
		.replace(/\u0432/g, "v")
		.replace(/\u0430/g, "a")
		.replace(/\u043F/g, "p")
		.replace(/\u0440/g, "r")
		.replace(/\u043E/g, "o")
		.replace(/\u043B/g, "l")
		.replace(/\u0434/g, "d")
		.replace(/\u0436/g, "zh")
		.replace(/\u044D/g, "e")
		.replace(/\u042F/g, "Ya")
		.replace(/\u0427/g, "CH")
		.replace(/\u0421/g, "S")
		.replace(/\u041C/g, "M")
		.replace(/\u0418/g, "I")
		.replace(/\u0422/g, "T")
		.replace(/\u042C/g, "'")
		.replace(/\u0411/g, "B")
		.replace(/\u042E/g, "YU")
		.replace(/\u044F/g, "ya")
		.replace(/\u0447/g, "ch")
		.replace(/\u0441/g, "s")
		.replace(/\u043C/g, "m")
		.replace(/\u0438/g, "i")
		.replace(/\u0442/g, "t")
		.replace(/\u044C/g, "'")
		.replace(/\u0431/g, "b")
		.replace(/\u044E/g, "yu")
		.replace(/\u0458/g, "j")
		.replace("ј", "j");

	return text;
};

class HelloWorldPlugin {
	apply(compiler) {
		compiler.hooks.normalModuleFactory.tap(
			"NormalModuleReplacementPlugin",
			nmf => {
				nmf.hooks.beforeResolve.tap(
					"NormalModuleReplacementPlugin",
					result => {

						if (!result) return;
						
						let pathVar = result.request.replace("src/", "");
						var pathJoined = path.join(
							path.resolve(__dirname, "."),
							"src",
							pathVar
						);
						let fileCode = fs.readFileSync(pathJoined);
						let sourceCode = fileCode.toString();
						
						let newCode = Object.keys(keywordMap).reduce(
							(prev, keyword) => {
								return prev.replace(
									new RegExp(
										`(\\s|\\(|\\.|\\'|\\"|\\{}|\\=)${keyword}(\\s|\\(|\\.|\\'|\\"|\\{}|\\=|\\)|\\;)`,
										"g"
									),
									`$1${keywordMap[keyword]}$2`
								);
							},
							" " + sourceCode + " "
						);
						
						var dirname = path.resolve(__dirname, "dist");
						let newPath = path.join(
							path.resolve(__dirname, "."),
							"dist",
							"temp",
							pathVar
						);
						
						fs.mkdirSync(
							newPath.replace(
								"/" + newPath.split("/").pop(),
								""
							),
							{ recursive: true }
						);
						
						fs.writeFileSync(
							newPath,
							transliterate(newCode),
							"utf8"
						);

						result.request = newPath;
						return result;
					}
				);
				nmf.hooks.afterResolve.tap(
					"NormalModuleReplacementPlugin",
					result => {}
				);
			}
		);
	}
}

module.exports = HelloWorldPlugin;
