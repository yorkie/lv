
#include "vec.h"

#if defined(__GNUC__) && (__GNUC__ > 2) && defined(__OPTIMIZE__)
#define likely(expr) __builtin_expect((expr), 1)
#define unlikely(expr) __builtin_expect((expr), 0)
#else
#define likely(expr) (expr)
#define unlikely(expr) (expr)
#endif

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
