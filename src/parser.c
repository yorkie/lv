
#include <stdio.h>
#include "parser.h"
#include "token.h"

#ifdef EBUG_PARSER
#define debug(name) \
  fprintf(stderr, "\n\e[90m%s\e[0m\n", name); \
  luna_token_inspect(&self->lex->tok);
#else
#define debug(name)
#endif

/*
 * Accept a token, advancing the lexer.
 */

#ifdef EBUG_PARSER
#define accept(t) \
  (peek->type == LUNA_TOKEN_##t \
    ? (fprintf(stderr, "\e[90maccepted \e[33m%s\e[0m\n", #t), \
      (self->lb = *self->la, self->la = NULL, &self->lb)) \
    : 0)
#else
#define accept(t) \
  (peek->type == LUNA_TOKEN_##t \
    ? (self->lb = *self->la, self->la = NULL, &self->lb) \
    : 0)
#endif

/*
 * Return the next token.
 */

#define advance (luna_scan(self->lex), &self->lex->tok)

/*
 * Previous token look-behind.
 */

#define prev (&self->lb)

/*
 * Return the next token, previously peeked token.
 */

#define next \
  (self->la \
    ? (self->tmp = self->la, self->la = NULL, self->tmp) \
    : advance)

/*
 * Single token look-ahead.
 */

#define peek (self->la ? self->la : (self->la = advance))

/*
 * Check if the next token is `t`.
 */

#define is(t) (peek->type == LUNA_TOKEN_##t)

/*
 * Set error context `str`, used in error reporting.
 */

#define context(str) (self->ctx = str)

/*
 * Set error `str` when not previously set.
 */

#define error(str) \
  ((self->err = self->err \
    ? self->err \
    : str), NULL)

void
quip_parser_init(quip_parser_t *self, quip_lexer_t *lex) {
  self->lex = lex;
  self->la = NULL;
  self->ctx = NULL;
  self->err = NULL;
  self->in_args = 0;
}

void
quip_parse(quip_parser_t *self) {


}