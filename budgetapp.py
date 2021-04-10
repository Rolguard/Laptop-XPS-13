# Create a budget class that can create an instance of (instantiate) objects on different budget categories
# where you can create categories e.g. food, entertainment, clothing (maybe not)
# Should be able to deposit and withdraw funds from each category, as well as calculate balances and
# transfer balance amounts between categories
# Plan to use tkinter to provide a GUI after doing this without it

# budget.create_category, budget.deposit, budget.withdraw, budget.check_balance, budget.transfer_balance
# Need to save the data of the category list for later in a file
import json
import os


def is_number(string):
    try:
        float(string)
        return True
    except ValueError:
        return False


class BudgetApp:
    def __init__(self, budget_category_data):
        self.budget_category_data = budget_category_data

    def create_category(self):
        new_category = input("Please insert your new budget category here: ")
        new_category_balance = input("Please insert the balance you want to set for this category "
                                     "(excluding dollar sign): ")
        unique_category = True
        valid_category_value = True

        if not is_number(new_category_balance):
            valid_category_value = False

        category_data_lines = []
        # Need to remove \n can be done using .splitlines(), .rstrip()
        # Parses json data into python dictionaries in a list, taking note of repeated category names and invalid values
        for line in self.budget_category_data:
            dictionary_data = json.loads(line)
            category_data_lines.append(dictionary_data)

            if new_category in dictionary_data.keys():
                unique_category = False

        if unique_category and valid_category_value:
            new_category_dict = {new_category: new_category_balance}
            print("Your new category and balance have been saved in budget_data.")

            # Checks if file is empty, so that newline is formatted correctly i.e no \n at start of empty file
            if os.path.getsize("budget_data.txt") > 0:
                self.budget_category_data.write("\n")
                json.dump(new_category_dict, self.budget_category_data)

            else:
                json.dump(new_category_dict, self.budget_category_data)

        elif not unique_category:
            print("That category already exists.")

        elif not valid_category_value:
            print("You entered an invalid value for the budget balance.")

        else:
            print("Error in loading budget_data.")

    def check_balance(self):
        # category_balance_check = input("Please type which category you would like to see the balance of: ")

        # Might need to do json.loads to load the budget_data again like in create_category

        # category_balance = self.budget_category_data[category]
        # print(f"The balance for {category} is {category_balance}")
        pass

    def delete_category(self, category):
        self.budget_category_data.pop(category)

    def deposit(self, category):
        deposit_amount = input("Please insert the amount you wish to deposit: ")

    def withdrawal(self, category):
        pass

    def transfer_balance(self, ):
        pass


try:
    with open("budget_data.txt", "r+") as budget_data:
        # a+ puts the stream position at the end of the file, meaning if you need to read it won't return anything
        # Unless you use .seek(0) to move the file pointer to the beginning of the file
        # r+ has the file pointer at the start of the file which moves to the end of the file after reading,
        # allowing you to append data
        new_budget = BudgetApp(budget_data)

        new_budget.create_category()


except FileNotFoundError:
    # w+ gives permission for both reading and writing
    f = open("budget_data.txt", "w")
    f.close()
    print("budget_data does not exist in the current directory and will now be created.")


# Testing if changes are being applied to Github repository
# Testing changes #2 for Github repository
