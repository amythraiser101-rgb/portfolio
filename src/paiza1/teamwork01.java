package paiza1;

import java.util.Random;
import java.util.Scanner;

public class teamwork01 {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);
        Random random = new Random();

        int hp = 100;
        int keys = 0;

        System.out.println("🧟 Zombie Escape Game");
        System.out.println("Collect 3 keys and escape!");

        while (hp > 0 && keys < 3) {

            System.out.println("\n==================");
            System.out.println("HP: " + hp);
            System.out.println("Keys: " + keys);
            System.out.println("==================");

            System.out.println("1. Enter a Room");
            System.out.println("2. Exchange 1 Key for 50 HP");

            int menu = scan.nextInt();

            System.out.println("Choose a room:");
            System.out.println("1. Bread Room");
            System.out.println("2. Medicine Room");
            System.out.println("3. Key Room");

            int choice = scan.nextInt();

            if (choice == 1) {

                if (random.nextBoolean()) {
                    hp += 20;
                    System.out.println("🍞 You found bread!");
                    System.out.println("+20 HP");
                } else {
                    hp -= 10;
                    System.out.println("🧟 Zombie attacked!");
                    System.out.println("-10 HP");
                }

            } else if (choice == 2) {

                if (random.nextBoolean()) {
                    hp += 50;
                    System.out.println("💊 You found medicine!");
                    System.out.println("+50 HP");
                } else {
                    hp -= 30;
                    System.out.println("🧟 Strong zombie attacked!");
                    System.out.println("-30 HP");
                }

            } else if (choice == 3) {

                if (random.nextBoolean()) {
                    keys++;
                    System.out.println("🗝 You found a key!");
                    System.out.println("Keys = " + keys);
                } else {
                    hp -= 80;
                    System.out.println("👹 Master Zombie appeared!");
                    System.out.println("-80 HP");
                }

            } else {
                System.out.println("Invalid room!");
            }

        }

        System.out.println("\n==================");

        if (hp <= 0) {
            System.out.println("💀 GAME OVER");
        } else {
            System.out.println("🎉 You collected 3 keys!");
            System.out.println("🚪 You escaped safely!");
        }

        scan.close();
    }
}