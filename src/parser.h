
//
// parser.h
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#ifndef __QUIP_PARSER_H__
#define __QUIP_PARSER_H__

typedef struct quip_parser_s {
  int op;

} quip_parser_t;


/*
 * Create a new parser to do some stuffs
 */
quip_parser_t * quip_parser_new();

/*
 * Destroy this parser
 */
int quip_parser_destroy(quip_parser_t*);

/*
 * Parse the source in this parser
 */
int quip_parser_parse(quip_parser_t*, char*);


#endif