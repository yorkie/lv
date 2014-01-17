
//
// parser.c
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#include <string.h>

#include "quip.h"
#include "parser.h"

quip_parser_t * quip_parser_new() {

  quip_parser_t * parser = (quip_parser_t*) malloc(sizeof(quip_parser_t));
  parser->op = 1;
  return parser;
}

int quip_parser_destroy(quip_parser_t * parser) {
  free(parser);
  return QUIP_OK;
}

int quip_parser_parse(quip_parser_t * parser, char * src) {

  /*
   * step 1: create context
   * step 2: parse
   * ...
   */
  int i;
  for (i=0;i<strlen(src);i++) {
    if (src[i] == 'v' && src[i+1] == 'a' && src[i+2] == 'r') {
      printf("beep\n");
      break;
    }
  }

  return QUIP_OK;
}