//
// quip.h
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#ifndef __QUIP_H__
#define __QUIP_H__

#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

/*
 * Quip version.
 */

#define QUIP_VERSION "0.0.1"
#define QUIP_OK 0


#define QUIP_PRINT(format, ...)                     \
  printf("\e[90m"format"\e[0m\n", ##__VA_ARGS__);   \


#endif /* __QUIP__ */