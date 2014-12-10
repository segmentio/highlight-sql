
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight SQL code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight.language('sql', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Comments.
 */

grammar.comment = /--.*$|\/\*[\s\S]*?\*\/|(\/\/)[\s\S]*?$/m;

/**
 * Strings.
 */

grammar.string = /("|').*?\1/;

/**
 * Keywords.
 */

grammar.keyword = /\b(and|as|begin|body|boolean|by|char|clob|commit|constant|count|cursor|date|default|delete|distinct|double|else|elsif|end|exception|exception_init|exists|float|for|from|function|group|if|in|inner|insert|int|integer|into|is|join|long|loop|matched|merge|nextval|not|number|on|order|others|out|outer|package|pragma|procedure|raise|return|rollback|rownum|rowtype|select|sequence|set|sysdate|table|then|timestamp|type|union|update|using|values|values|varchar|varchar2|when|where|while|xmltype)\b/i;

/**
 * Numbers.
 */

grammar.number = /\b[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\b/;

/**
 * Operators.
 */

grammar.operator = /[=+!*|><&-]/;

/**
 * Constant.
 */

grammar.constant = /\b(false|null|true)\b/i;

/**
 * Function.
 */

grammar.function = {
  pattern: /(\w+)\(/,
  children: {
    function: /(\w+)/,
    punctuation: /\(/
  }
};

/**
 * Punctuation.
 */

grammar.punctuation = /[,.()]/;