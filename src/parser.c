
#include <stdio.h>
#include "parser.h"
#include "token.h"

void
quip_parser_init(quip_parser_t *self, quip_lexer_t *lex) {
  self->lex = lex;
  self->la = NULL;
  self->ctx = NULL;
  self->err = NULL;
  self->in_args = 0;
}