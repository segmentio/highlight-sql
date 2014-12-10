
var assert = require('assert');
var Highlight = require('highlight');
var sql = require('highlight-sql');

describe('highlight-sql', function(){
  it('should expose a plugin function', function(){
    assert.equal('function', typeof sql);
  });

  it('should match comments', function(){
    test('a /* comment \n across lines */', 'a <span class="comment">/* comment \n across lines */</span>');
    test('--a comment', '<span class="comment">--a comment</span>');
  });

  it('should match strings', function(){
    test('"string"', '<span class="string">&quot;string&quot;</span>');
    test('\'string\'', '<span class="string">&#39;string&#39;</span>');
  });

  it('should match keywords', function(){
    test('select', '<span class="keyword">select</span>');
    test('FROM', '<span class="keyword">FROM</span>');
    test('GROUP by', '<span class="keyword">GROUP</span> <span class="keyword">by</span>');
  });

  it('should match numbers', function(){
    test('42', '<span class="number">42</span>');
    test('4e3', '<span class="number">4e3</span>');
    test('-8', '<span class="operator">-</span><span class="number">8</span>');
  });

  it('should match operators', function(){
    test('+', '<span class="operator">+</span>');
    test('*', '<span class="operator">*</span>');
  });

  it('should match constants', function(){
    test('true', '<span class="constant">true</span>');
    test('FALSE', '<span class="constant">FALSE</span>');
  });

  it('should match functions', function(){
    test('something(1)', '<span class="function"><span class="function">something</span><span class="punctuation">(</span></span><span class="number">1</span><span class="punctuation">)</span>');
    test('DATE_TRUNC(\'month\')', '<span class="function"><span class="function">DATE_TRUNC</span><span class="punctuation">(</span></span><span class="string">&#39;month&#39;</span><span class="punctuation">)</span>');
  });

  it('should match punctuation', function(){
    test('(', '<span class="punctuation">(</span>');
    test(',', '<span class="punctuation">,</span>');
  });

  it('should match a complex example', function(){
    var sql = 'select '
      + 'date_trunc(\'month\', created_at), '
      + 'payment_plan, '
      + 'count(1) '
      + 'from segment.iphone_production.session_started '
      + 'join web_prod.users '
      + 'on users.id = session_started.user_id '
      + 'group by 1, 2';

    test(sql, ''
      + '<span class="keyword">select</span> '
      + '<span class="function">'
      + '<span class="function">date_trunc</span>'
      + '<span class="punctuation">(</span></span>'
      + '<span class="string">&#39;month&#39;</span>'
      + '<span class="punctuation">,</span> '
      + 'created_at'
      + '<span class="punctuation">)</span>'
      + '<span class="punctuation">,</span> '
      + 'payment_plan'
      + '<span class="punctuation">,</span> '
      + '<span class="keyword">count</span>'
      + '<span class="punctuation">(</span>'
      + '<span class="number">1</span>'
      + '<span class="punctuation">)</span> '
      + '<span class="keyword">from</span> segment'
      + '<span class="punctuation">.</span>'
      + 'iphone_production'
      + '<span class="punctuation">.</span>'
      + 'session_started '
      + '<span class="keyword">join</span> web_prod'
      + '<span class="punctuation">.</span>'
      + 'users '
      + '<span class="keyword">on</span> users'
      + '<span class="punctuation">.</span>'
      + 'id '
      + '<span class="operator">=</span> session_started'
      + '<span class="punctuation">.</span>'
      + 'user_id '
      + '<span class="keyword">group</span> <span class="keyword">by</span> '
      + '<span class="number">1</span>'
      + '<span class="punctuation">,</span> '
      + '<span class="number">2</span>');
  });
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, output){
  var h = Highlight().prefix('').use(sql);
  var code = h.string(input, 'sql');
  assert.equal(code, output);
}
