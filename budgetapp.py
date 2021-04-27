# Create a budget class that can create an instance of (instantiate) objects on different budget categories
# where you can create categories e.g. food, entertainment, clothing
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
        # Note that if I wanted to make several json objects {} , {} then these would need to be stored in a json]
        # array i.e. [{key1:value1}, {key2:value2}, {key3:value3}]
        new_category = input("Please insert your new budget category here: ")
        new_category_balance = input("Please insert the balance you want to set for this category "
                                     "(excluding dollar sign): ")
        empty_file = False
        unique_category = True
        valid_category_value = False

        if os.path.getsize("budget_data.json") == 0:
            empty_file = True

        if is_number(new_category_balance):
            new_category_balance = float(new_category_balance)
            valid_category_value = True

        if not empty_file:
            # Check if unique category
            category_data = json.load(self.budget_category_data)
            for key in category_data:
                if new_category == key:
                    unique_category = False
                    break

        if unique_category and valid_category_value:
            new_category_dict = {new_category: new_category_balance}
            print("Your new category and balance have been saved in budget_data.")

            if empty_file:
                json.dump(new_category_dict, self.budget_category_data)

            else:
                category_data.update(new_category_dict)
                self.budget_category_data.seek(0)
                json.dump(category_data, self.budget_category_data, indent=2)

        elif not unique_category:
            print("That category already exists.")

        elif not valid_category_value:
            print("You entered an invalid value for the budget balance.")

        else:
            print("Error in loading budget_data.")

    def check_balance(self):
        category_check = input("Please type which category you would like to see the balance of: ")
        category_data = json.load(self.budget_category_data)
        category_found = False

        for key in category_data:
            if category_check == key:
                category_found = True
                print(f"The balance for {key} is ${category_data[key]}")

        if not category_found:
            print("The category could not been found. Please try create the create the category first before "
                  "accessing the balance.")

    def delete_category(self):
        # Category_data returns a dictionary
        category_data = json.load(self.budget_category_data)
        valid_category = False
        # Return a list of the keys of the dictionary
        keys = list(category_data.keys())

        print(f"The current categories that are able to be deleted are: {keys}")
        category_check = input("Please type which category you would like to delete: ")

        for category_key in category_data:
            if category_key == category_check:
                valid_category = True
                category_data.pop(category_check)
                break

        if valid_category:
            self.budget_category_data.seek(0)
            json.dump(category_data, self.budget_category_data, indent=2)
            # Truncate shortens the file to the current file position, used since updated data is smaller than original
            self.budget_category_data.truncate()
            print(f"{category_check} has been successfully deleted.")

        else:
            print(f"The category {category_check} could not be found. Please check you have created the category "
                  "before deleting it.")

    def deposit(self, category):
        deposit_amount = input("Please insert the amount you wish to deposit: ")

    def withdrawal(self, category):
        pass

    def transfer_balance(self, ):
        pass


try:
    with open("budget_data.json", "r+") as budget_data:
        # a+ puts the stream position at the end of the file, meaning if you need to read it won't return anything
        # Unless you use .seek(0) to move the file pointer to the beginning of the file
        # r+ has the file pointer at the start of the file which moves to the end of the file after reading,
        # allowing you to append data
        new_budget = BudgetApp(budget_data)

        new_budget.create_category()


except FileNotFoundError:
    # w+ gives permission for both reading and writing
    f = open("budget_data.json", "w")
    f.close()
    print("budget_data does not exist in the current directory and will now be created.")
