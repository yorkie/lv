//
// quip.c
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#include <stdio.h>
#include <uv.h>

#include "quip.h"
#include "parser.h"

int main(int argc, char **argv) {
  
  uv_loop_t *loop = uv_default_loop();
  int blocking;
  
  /*
   * TODO(Yorkie): Stuffs
   */
  QUIP_PRINT("Hello Quip!");
  
  uv_run(loop, UV_RUN_DEFAULT);

  quip_parser_t * p = quip_parser_new();
  char * demo_src = "var a = 10\n";

  quip_parser_parse(p, demo_src);

  /*
   * Blocking this window
   */
  scanf("%d", &blocking);
  return 0;
}