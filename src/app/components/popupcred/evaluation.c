#include <stdio.h>
#include <string.h>

int is_prime(int num) {
    if (num <= 1) return 0;
    for (int i = 2; i < num; i++) {
        if (num % i == 0) return 0;
    }
    return 1;
}

int count_consonants(char *name) {
    int count = 0;
    for (int i = 0; i < strlen(name); i++) {
        char ch = name[i];
        if ((ch >= 'a' && ch <= 'z' && ch != 'a' && ch != 'e' && ch != 'i' && ch != 'o' && ch != 'u') ||
            (ch >= 'A' && ch <= 'Z' && ch != 'A' && ch != 'E' && ch != 'I' && ch != 'O' && ch != 'U')) {
            count++;
        }
    }
    return count;
}

int main() {
    int n;

    printf("Enter the number of names: ");
    scanf("%d", &n);

    char names[n][30];

    printf("\nEnter the names:\n");
    for (int i = 0; i < n; i++) {
        scanf("%s", names[i]);
    }

    printf("\nNames with a prime number of consonants:\n");
    for (int i = 0; i < n; i++) {
        int no_of_consonents = count_consonants(names[i]);
        if (is_prime(no_of_consonents)) 
            printf("%s : %d\n", names[i], no_of_consonents);
    }
    return 0;
}