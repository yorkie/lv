//
// quip.c
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#include <stdio.h>
#include <uv.h>
#include "quip.h"

int main(int argc, char **argv) {
  
  uv_loop_t *loop = uv_default_loop();
  int blocking;
  
  /*
   * TODO(Yorkie): Stuffs
   */
  QUIP_PRINT("Hello Quip!");
  
  uv_run(loop, UV_RUN_DEFAULT);
  
  scanf("%d", &blocking);
  return 0;
}