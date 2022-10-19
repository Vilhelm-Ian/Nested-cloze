let string1 =
   "The war was {{c3::{{c2::19::it was the last century}}{{c1::42}}}}";
let string2 = "The war was {{c2::{{c3::19}}{{c1::42}}}}";
let string3 = "The war was {{c1::{{c2::19}}{{c3::42}}}}";
let string4 =
   "The first world war begon {{c1::{{c2::19}}{{c3::36}}}} and ended {{c4::{{c5::19}}{{c6::42}}}}";
let string5 = "This is a {{c2::cloze}} not a {{c1::question}}";
let string6 = "This is a {{c1::cloze}} not a {{c2::question}}";

let is_nested_cloze = /{{c\d+::.*?}}}}/g;
let remove_cloze = /{{c\d+::|((::.*?)?}})/g;
let get_cloze_answer = /(?<={{c\d+::).*?((?=::)|(?=}}))/g;

function generate_cloze(string) {
   let nested_cloze = string.match(is_nested_cloze);
   if (nested_cloze) {
      for (let i = 0; i < nested_cloze.length; i++) {
         let clozes = nested_cloze[i].slice(6);
         clozes = clozes.match(get_cloze_answer);
         console.log({ clozes });
         clozes.forEach((answer) => {
            let get_cloze = new RegExp(`({{c\\d+::)${answer}.*?(}})`, "g");
            let match = string.match(get_cloze);
            let question = string.replaceAll(get_cloze, "[...]");
            question = question.replaceAll(remove_cloze, "");
            console.log({ question, answer, match, get_cloze });
         });
         let answer = clozes.reduce((result, element) => result + element, "");
         let question = string.replace(nested_cloze, "[...]");
         question = question.replaceAll(remove_cloze, "");
         console.log({ nested_cloze, answer, question });
      }
   }
}

generate_cloze(string1);
generate_cloze(string2);
generate_cloze(string3);
generate_cloze(string4);
generate_cloze(string5);
generate_cloze(string6);
