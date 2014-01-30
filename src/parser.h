
//
// parser.h
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#ifndef __QUIP_PARSER__
#define __QUIP_PARSER__

#include "lexer.h"
#include "ast.h"

/*
 * Parser struct.
 */

typedef struct {
  char *ctx;
  char *err;
  int in_args;
  quip_token_t *tmp;
  quip_token_t *la;
  quip_token_t lb;
  quip_lexer_t *lex;
} quip_parser_t;

// protos

void
quip_parser_init(quip_parser_t *self, quip_lexer_t *lex);

#endif /* __QUIP_PARSER__ */