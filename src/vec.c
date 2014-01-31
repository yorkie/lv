
#include "vec.h"
#include "internal.h"

/*
 * Alloc and initialize a new array.
 */

quip_vec_t *
quip_vec_new() {
  quip_vec_t *self = malloc(sizeof(quip_vec_t));
  if (unlikely(!self)) return NULL;
  quip_vec_init(self);
  return self;
}
