
#ifndef __QUIP_LEXER_H__
#define __QUIP_LEXER_H__

#include <stdio.h>
#include "token.h"

#ifndef QUIP_BUF_SIZE
#define QUIP_BUF_SIZE 1024
#endif

/*
 * Lexer struct.
 */

typedef struct {
  char *error;
  int stash;
  int lineno;
  off_t offset;
  char *source;
  const char *filename;
  quip_token_t tok;
  char buf[QUIP_BUF_SIZE];
} quip_lexer_t;

/*
 * scan lexer source
 */

int quip_scan(quip_lexer_t * self);

/*
 * init quip lexer by self/source/filename
 */

void quip_lexer_init(quip_lexer_t *self, char *source, const char *filename);


# endif
