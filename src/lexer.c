

#include "lexer.h"

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

int quip_scan(luna_lexer_t * self) {
  // TODO
}