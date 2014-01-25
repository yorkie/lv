//
// quip.c
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#include <stdio.h>
#include <uv.h>

#include "quip.h"
#include "vm.h"
#include "lexer.h"
#include "parser.h"


int eval(char * src, const char * path) {
  /* parse the input */
  quip_lexer_t lex;
  quip_lexer_init(&lex, source, path);
  quip_parser_t parser;
  quip_parser_init(&parser, &lex);
  quip_block_node_t *root;

  /* --tokens */
  if (tokens) {
    while (quip_scan(&lex)) {
      printf("  \e[90m%d : \e[m", lex.lineno);
      quip_token_inspect(&lex.tok);
    }
    return 0;
  }

  /* oh noes! */
  if (!(root = quip_parse(&parser))) {
    quip_report_error(&parser);
    return 1;
  }

  /* --ast */
  if (ast) {
    quip_prettyprint((quip_node_t *) root);
    return 1;
  }

  /* evaluate */
  quip_vm_t *vm = quip_gen((quip_node_t *) root);
  quip_object_t *obj = quip_eval(vm);
  quip_object_inspect(obj);

  return 0;
}


int main(int argc, char **argv) {
  int tried_ext = 0;
  const char *path, *orig;
  char * src;

  /* eval file */
  orig = path = argv[1];
  read:
  if (!(source = file_read(path))) {
    if (!tried_ext) {
      tried_ext = 1;
      char buf[256];
      snprintf(buf, 256, "%s.q", path);
      path = buf;
      goto read;
    }
    fprintf(stderr, "error reading %s:\n\n  %s\n\n", orig, strerror(errno));
    exit(1);
  }

  return eval(src, path);
}