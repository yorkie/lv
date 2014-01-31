
#ifndef __QUIP_VEC_H__
#define __QUIP_VEC_H__

#include "object.h"
#include "kvec.h"

/*
 * quip array.
 */

typedef kvec_t(quip_object_t *) quip_vec_t;

/*
 * Initialize an array.
 */

#define quip_vec_init(self) kv_init(*self)

/*
 * Return the array length.
 */

#define quip_vec_length(self) kv_size(*self)

/*
 * Push `obj` into the array.
 */

#define quip_vec_push(self, obj) \
  kv_push(quip_object_t *, *self, obj)

/*
 * Pop an object out of the array.
 */

#define quip_vec_pop(self) \
  (quip_vec_length(self) \
    ? kv_pop(*self) \
    : NULL)

/*
 * Return the object at `i`.
 */

#define quip_vec_at(self, i) \
  (((i) >= 0 && (i) < quip_vec_length(self)) \
    ? kv_A(*self, (i)) \
    : NULL)

/*
 * Iterate the array, populating `i` and `val`.
 */

#define quip_vec_each(self, block) { \
    quip_object_t *val; \
    int len = quip_vec_length(self); \
    for (int i = 0; i < len; ++i) { \
      val = quip_vec_at(self, i); \
      block; \
    } \
  }

// protos

quip_vec_t *
quip_vec_new();

#endif
