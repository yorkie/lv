

#include "lexer.h"

/*
 * Next char in the array.
 */

#ifdef EBUG_LEXER
#define next \
  (self->stash = self->source[self->offset++]\
    , fprintf(stderr, "'%c'\n", self->stash)\
    , self->stash)
#else
#define next (self->stash = self->source[self->offset++])
#endif

/*
 * Undo the previous char.
 */

#define undo (self->source[--self->offset] = self->stash)

/*
 * Assign token `t`.
 */

#define token(t) (self->tok.type = QUIP_TOKEN_##t)

/*
 * Accept char `c` or undo and return 0.
 */

#define accept(c) (c == next ? c : (undo, 0))

/*
 * Set error `msg` and assign ILLEGAL token.
 */

#define error(msg) (self->error = msg, token(ILLEGAL))


void quip_lexer_init(quip_lexer_t * self, char * source, const char * filename) {
  self->error = NULL;
  self->source = source;
  self->filename = filename;
  self->lineno = 1;
  self->offset = 0;
}

int quip_scan(quip_lexer_t * self) {
  int c;
  token(ILLEGAL);

  // scan
  scan:
  switch (c = next) {
  case ' ':
  case '\t': goto scan;
  case '(': return token(LPAREN);
  case ')': return token(RPAREN);
  case '{': return token(LBRACE);
  case '}': return token(RBRACE);
  case '[': return token(LBRACK);
  case ']': return token(RBRACK);
  case ',': return token(COMMA);
  case '.': return token(OP_DOT);
  case '%': return token(OP_MOD);
  case '^': return token(OP_BIT_XOR);
  case '~': return token(OP_BIT_NOT);
  case '?': return token(QMARK);
  case ':': return token(COLON);
  case '+':
    switch (next) {
    case '=': return token(OP_PLUS_ASSIGN);
    default: return undo, token(OP_PLUS);
    }
  case '-':
    switch (next) {    
    case '=': return token(OP_MINUS_ASSIGN);
    default: return undo, token(OP_MINUS);
    }
  case '*':
    switch (next) {
    case '=': return token(OP_MUL_ASSIGN);
    default: return undo, token(OP_MUL);
    }
  case '/':
    return '=' == next
      ? token(OP_DIV_ASSIGN)
      : (undo, token(OP_DIV));
  case '!':
    return '=' == next
      ? token(OP_NEQ)
      : (undo, token(OP_NOT));
  case '=':
    return '=' == next
      ? token(OP_EQ)
      : (undo, token(OP_ASSIGN));
  case '&':
    return '&' == next
      ? token(OP_AND)
      : (undo, token(OP_BIT_AND));
  case '|':
    return '|' == next
      ? token(OP_OR)
      : (undo, token(OP_BIT_OR));
  case '<':
    switch (next) {
    case '=': return token(OP_LTE);
    case '<': return token(OP_BIT_SHL);
    default: return undo, token(OP_LT);
    }
  case '>':
    switch (next) {
    case '=': return token(OP_GTE);
    case '>': return token(OP_BIT_SHR);
    default: return undo, token(OP_GT);
    }
  case '\n':
    return scan_newline(self);
  case '"':
  case '\'':
    return scan_string(self, c);
  case 0:
    token(EOS);
    return 0;
  default:
    /* TODO */
    return 0;
  }
}