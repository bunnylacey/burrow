////////////////////////////////////////////////////////////////////////////////
// Main File:        generate_magic.c
// This File:        generate_magic.c
// Other Files:      N/A
// Semester:         CS 354 Fall 2016
//
// Author:           Scott E. Lacey
// Email:            slacey@wisc.edu
// CS Login:         scott
////////////////////////////////////////////////////////////////////////////////

#include <stdio.h>
#include <stdlib.h>

// Structure representing Square
// size: dimension(number of rows/columns) of the square
// array: 2D array of integers
typedef struct _Square {
	int size;
	int **array;
} Square;

int get_square_size();
Square * generate_magic(int size);
void write_to_file(Square * square, char *filename);

int main(int argc, char *argv[])
{
	// Check input arguments to get filename
	if(2 != argc)
	{
		// Not the correct number of arguments, exit the program
		fprintf(stderr, "Invalid number of arguments, please provide one argument as the filename for the output.\n");
		exit(1);
	}

	// Get size from user
	int size = get_square_size();

	// Generate the magic square
	Square *mySquare;
	mySquare = generate_magic(size);
	
	// Write the square to the output file
	write_to_file(mySquare, argv[1]);

	// Clean up the square
	for(int k = 0; k < (*mySquare).size; k++) {
		//for(int j = 0; j < (*mySquare).size; j++) {
			//fprintf(stdout, "%i ", *(*((*mySquare).array + k) + j));
		//}
		//fprintf(stdout, "\n");
		free(*((*mySquare).array + k));
	}
	free((*mySquare).array);
	free(mySquare);

	return 0;
}

// get_square_size prompts the user for the magic square size
// checks if it is an odd number >= 3 and returns the number
int get_square_size()
{
	char *input = malloc(100);
	int size;

	if(input == NULL) {
		fprintf(stderr, "Error accessing memory.\n");
		exit(1);
	}

 	fprintf(stdout, "Enter size of magic square, must be odd\n");
 	if(fgets(input, 100, stdin) == NULL) {
 		fprintf(stderr, "Error reading user input.\n");
		free(input);
 		exit(1);
 	}

	size = atoi(input);
	free(input);
	
	// check if number is >= 3
	if(3 > size) {
		fprintf(stderr, "Number too small. Size must be an odd number >= 3.\n");
		exit(1);
	}
	// check if size is an odd number
	if((size / 2) != ((size - 1) / 2)) {
		fprintf(stderr, "Number is even. Size must be an odd number >= 3.\n");
		exit(1);
	}
	return size;
}

// generate_magic constructs a magic square of size n
// using the Siamese algorithm and returns the Square struct
Square * generate_magic(int n)
{
	// initialize a new square
	Square *new_square;
	new_square = malloc(sizeof(Square));
	if(NULL == new_square) {
		fprintf(stderr, "Error accessing memory.\n");
		exit(1);
	}
	(*new_square).size = n;
	(*new_square).array = malloc(sizeof(int*) * n);
	if(NULL == (*new_square).array) {
		free(new_square);
		fprintf(stderr, "Error accessing memory.\n");
		exit(1);
	}
	for(int k = 0; k < n; k++) {
		*((*new_square).array + k) = calloc(n, sizeof(int));
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

	// populate the square
	int col, row, nextCol, nextRow;
	col = n / 2;
	row = 0;
	
	for(int k = 1; k <= n*n; k++) {
		*(*((*new_square).array + row) + col) = k;

		nextCol = col + 1;
		nextRow = row - 1;
		if(nextCol >= n)
			nextCol = 0;
		if(nextRow < 0)
			nextRow = n-1;
		// check if the next square is 0, if not shift down 1
		if(*(*((*new_square).array + nextRow) + nextCol) > 0) {
			row = row + 1;
			if(row >= n)
				row = 0;
		} else {
			col = nextCol;
			row = nextRow;
		}
	}

	return new_square;
}

// write_to_file opens up a new file(or overwrites the existing file)
// and writes out the square in the format expected by verify_magic.c
void write_to_file(Square * square, char *filename)
{
	FILE *ofp;
	ofp = fopen(filename, "w+");
	if(ofp == NULL) {
		fprintf(stderr, "Can't open output file %s!\n", filename);
		return;
	}
	
	char sint[257];	
	sprintf(sint, "%i", (*square).size);
	if(fputs(sint, ofp) == 0) {
		fprintf(stderr, "Error writing to output file %s!\n", filename);
		fclose(ofp);
		return;
	}

	for(int k = 0; k < (*square).size; k++) {
		fputs("\n", ofp);
		for(int j = 0; j < (*square).size; j++) {
			if(j > 0)
				fputs(",", ofp);
			sprintf(sint, "%i", *(*((*square).array + k) + j));
			if(fputs(sint, ofp) == 0) {
				fprintf(stderr, "Error writing to output file %s!\n", filename);
				fclose(ofp);
				return;
			}
		}
	}

	fclose(ofp);
}
