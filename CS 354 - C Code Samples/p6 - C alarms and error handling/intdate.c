/* Name:Scott Lacey
 * CS login:Scott
 * Section:M/W/F @ 13:20
 */

#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <signal.h>

void alrm_handler(int sig);
void int_handler(int sig);

int static delay = 3;
int exit_attempts = 5;
time_t t;
char *d;

struct sigaction sa_alrm;
struct sigaction sa_int;

int main ()
{
	memset (&sa_alrm, 0, sizeof(sa_alrm));
	memset (&sa_int, 0, sizeof(sa_int));

	printf("Date will be printed every 3 seconds\n");
	printf("Enter ^C to end the program:\n");
	
	sa_alrm.sa_handler = &alrm_handler;
	sa_alrm.sa_flags = SIGALRM;

	sa_int.sa_handler = &int_handler;
	sa_int.sa_flags = SIGINT;

	if(sigaction(SIGALRM, &sa_alrm, NULL) != 0)
	{
		printf("Error setting SIGALRM");
		exit(0);
	}
	if(sigaction(SIGINT, &sa_int, NULL) != 0)
	{
		printf("Error setting SIGINT");
		exit(0);
	}

	alarm(delay);

	while (1)
	{

	}

	return 0;
}

void alrm_handler(int sig)
{
	t = time(NULL);

	if(-1 == t)
	{
		printf("Error setting time\n");
		exit(0);
	}
	d = ctime(&t);
	if(NULL == d)
	{
		printf("Error setting time\n");
		exit(0);
	}
	fprintf(stdout, "current time is %s", d);
	alarm(delay);
}

void int_handler(int sig)
{
	if(exit_attempts > 1)
	{
		exit_attempts--;
		fprintf(stdout, "\nControl-c caught. %i more before program ends.\n", exit_attempts);
	} else {
		printf("\nFinal control-c caught. Exiting.\n");
		exit(0);
	}
}
