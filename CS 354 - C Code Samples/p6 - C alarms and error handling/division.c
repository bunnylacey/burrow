/* Name:Scott Lacey
 * CS login:Scott
 * Section:M/W/F @ 13:20
 */

#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>

void int_handler(int sig);
void fpe_handler(int sig);

struct sigaction sa_int;
struct sigaction sa_fpe;

int success_count = 0;
char *input;

int main ()
{
	input = malloc(100);

	if(input == NULL)
		exit(0);

	memset (&sa_fpe, 0, sizeof(sa_fpe));
	memset (&sa_int, 0, sizeof(sa_int));

	sa_fpe.sa_handler = &fpe_handler;
	sa_fpe.sa_flags = SIGFPE;

	sa_int.sa_handler = &int_handler;
	sa_int.sa_flags = SIGINT;

	if(sigaction(SIGFPE, &sa_fpe, NULL) != 0)
	{
		printf("Error setting SIGFPE");
		exit(0);
	}
	if(sigaction(SIGINT, &sa_int, NULL) != 0)
	{
		printf("Error setting SIGINT");
		exit(0);
	}

	int num_1, num_2;
	
	while(1)
	{
		printf("Enter first integer: ");

		if(fgets(input, 100, stdin) == NULL)
		{
			fprintf(stderr, "Error reading user input.\n");
			free(input);
			exit(1);
		}

		num_1 = atoi(input);

		printf("Enter second integer: ");

		if(fgets(input, 100, stdin) == NULL)
		{
			fprintf(stderr, "Error reading user input.\n");
			free(input);
			exit(1);
		}

		num_2 = atoi(input);

		fprintf(stdout, "%i / %i is %i with a remainder of %i\n", num_1, num_2, (num_1/num_2), (num_1%num_2));

		success_count++;
		
	}

	free(input);

	return 0;
}

void int_handler(int sig)
{
	free(input);
	fprintf(stdout, "\nTotal number of operations successfully completed: %i\n", success_count);
	printf("The program will be halted.\n");
	exit(0);
}

void fpe_handler(int sig)
{
	free(input);
	printf("Error: a division by 0 operation was attempted.\n");
	fprintf(stdout, "Total number of operations successfully completed: %i\n", success_count);
	printf("The program will be halted.\n");
	exit(0);
}
