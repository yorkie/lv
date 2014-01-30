

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


void 
quip_lexer_init(quip_lexer_t * self, char * source, const char * filename) {
  self->error = NULL;
  self->source = source;
  self->filename = filename;
  self->lineno = 1;
  self->offset = 0;
}

/*
 * Convert hex digit `c` to a base 10 int,
 * returning -1 on failure.
 */

static int
hex(const char c) {
  if (c >= '0' && c <= '9') return c - '0';
  if (c >= 'a' && c <= 'f') return c - 'a' + 10;
  if (c >= 'A' && c <= 'F') return c - 'A' + 10;
  return -1;
}

/*
 * Scan newline.
 */

static int
scan_newline(quip_lexer_t *self) {
  int curr = 0;
  ++self->lineno;
  while (accept(' ')) ++curr;
  token(NEWLINE);
  return 1;
}

/*
 * Scan identifier.
 */

static int
scan_ident(quip_lexer_t *self, int c) {
  int len = 0;
  char buf[128]; // TODO: ditch these buffers
  token(ID);

  do {
    buf[len++] = c;
  } while (isalpha(c = next) || isdigit(c) || '_' == c);
  undo;

  buf[len++] = 0;
  switch (len-1) {
  case 2:
    if (0 == strcmp("if", buf)) return token(IF);
    else {
      goto ToString;
    }
  case 3:
    if (0 == strcmp("for", buf)) return token(FOR);
    else if (0 == strcmp("set", buf)) return token(SETTER);
    else if (0 == strcmp("get", buf)) return token(GETTER);
    else if (0 == strcmp("new", buf)) return token(NEW);
    else if (0 == strcmp("try", buf)) return token(TRY);
    else {
      goto ToString;
    }
  case 4:
    if (0 == strcmp("this", buf)) return token(THIS);
    else if (0 == strcmp("else", buf)) return token(ELSE);
    else {
      goto ToString;
    }
  case 5:
    if (0 == strcmp("super", buf)) return token(SUPER);
    else if (0 == strcmp("yield", buf)) return token(YIELD);
    else if (0 == strcmp("catch", buf)) return token(CATCH);
    else if (0 == strcmp("throw", buf)) return token(THROW);
    else {
      goto ToString;
    }
  default:
    if (0 == strcmp("return", buf)) return token(RETURN);
    else if (0 == strcmp("finally", buf)) return token(FINALLY);
    else if (0 == strcmp("inherits", buf)) return token(INHERITS);
    else {
      goto ToString;
    }
  }

ToString:
  self->tok.value.as_string = strdup(buf);
  return 1;
}



/* 
 * Scan tokens
 */

int 
quip_scan(quip_lexer_t * self) {
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