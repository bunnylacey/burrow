////////////////////////////////////////////////////////////////////////////////
// Main File:        verify_magic.c
// This File:        verify_magic.c
// Other Files:      N/A
// Semester:         CS 354 Fall 2016
//
// Author:           Scott E. Lacey
// Email:            slacey@wisc.edu
// CS Login:         scott
////////////////////////////////////////////////////////////////////////////////

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure representing Square
// size: dimension(number of rows/columns) of the square
// array: 2D array of integers
typedef struct _Square {
	int size;
	int **array;
} Square;

Square * construct_square(char *filename);
int verify_magic(Square * square);

int main(int argc, char *argv[])
{
	// Check input arguments to get filename
	if(2 != argc)
	{
		// Not the correct number of arguments, exit the program
		fprintf(stderr, "Invalid number of arguments, please provide one argument as the filename for the magic square to varify.\n");
		exit(1);
	}

	// Construct square
	Square *mySquare = construct_square(argv[1]);

	// Verify if it's a magic square and print true or false
	if(1==verify_magic(mySquare)) {
		fprintf(stdout, "true\n");
	} else {
		fprintf(stdout, "false\n");
	}

	// Clean up the square
	for(int k = 0; k < (*mySquare).size; k++) {
		//for(int j = 0; j < (*mySquare).size; j++) {
		//	fprintf(stdout, "%i ", *(*((*mySquare).array + k) + j));
		//}
		//fprintf(stdout, "\n");
		free(*((*mySquare).array + k));
	}
	free((*mySquare).array);
	free(mySquare);

	return 0;
}

// construct_square reads the input file to initialize a square struct
// from the contents of the file and returns the square.
// The format of the file is defined in the assignment specifications
Square * construct_square(char *filename)
{
	// Open and read the file
	FILE *ifp;
	ifp = fopen(filename, "r");
	if(NULL == ifp) {
		fprintf(stderr, "Can't open input file %s!\n", filename);
		exit(1);
	}
	
    	// Read the first line to get the square size
	const int buffsize = 1024;
	char buffer[buffsize];
	char *token;
	int square_size;

	if(fgets(buffer, buffsize, ifp) != NULL)
	{
		square_size = atoi(buffer);
	} else {
		fprintf(stderr, "Error reading input file %s!\n", filename);
		exit(1);
	}

 	// Initialize a new Square struct of that size
	Square *new_square;
	new_square = malloc(sizeof(Square));
	if(NULL == new_square) {
		fprintf(stderr, "Error accessing memory.\n");
		exit(1);
	}
	(*new_square).size = square_size;
	(*new_square).array = malloc(sizeof(int*) * square_size);
	if(NULL == (*new_square).array) {
		free(new_square);
		fprintf(stderr, "Error accessing memory.\n");
		exit(1);
	}
	for(int k = 0; k < square_size; k++) {
		*((*new_square).array + k) = malloc(sizeof(int) * square_size);
		if(NULL == *((*new_square).array + k)) {
			for(int j = k - 1; j >= 0; j--) {
				free(*((*new_square).array + j));
			}
			free((*new_square).array);
			free(new_square);
			fprintf(stderr, "Error accessing memory.\n");
			exit(1);
		}
	}
    
 	// Read the rest of the file to fill up the square
	for(int i = 0; i < square_size; i++) {
		if(fgets(buffer, buffsize, ifp) != NULL)
		{
			token = strtok(buffer, ",");
			for(int j = 0; j < square_size; j++) {
				*(*((*new_square).array + i) + j) = atoi(token);
				token = strtok(NULL, ",");
			}
		} else {
			fprintf(stderr, "Error reading input file %s!\n", filename);
			exit(1);
		}
	}
	
	fclose(ifp);

 	return new_square;
}

// verify_magic verifies if the square is a magic square
// returns 1(true) or 0(false)
int verify_magic(Square * square)
{
	int total = ((*square).size * ((*square).size * (*square).size + 1)) / 2;
	int check;
	// Check all rows sum to same number
	for(int k = 0; k < (*square).size; k++) {
		check = 0;
		for(int j = 0; j < (*square).size; j++) {
			check = check + *(*((*square).array + k) + j);
		}
		if(check != total) {
			return 0;
		}
	}

	// Check all cols sum to same number
	for(int k = 0; k < (*square).size; k++) {
		check = 0;
		for(int j = 0; j < (*square).size; j++) {
			check = check + *(*((*square).array + j) + k);
		}
		if(check != total) {
			return 0;
		}
	}

	// Check main diagonal
	check = 0;
	for(int k = 0; k < (*square).size; k++) {
		check = check + *(*((*square).array + k) + k);
	}
	if(check != total) {
		return 0;
	}

	// Check secondary diagonal
	check = 0;
	for(int k = 0; k < (*square).size; k++) {
		check = check + *(*((*square).array + k) + ((*square).size - k - 1));
	}
	if(check != total) {
		return 0;
	}

	return 1;
}
