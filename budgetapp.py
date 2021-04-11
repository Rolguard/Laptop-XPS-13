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

    # Returns list of dictionaries containing category and balance as key-value pairs
    # def load_budget_data(self):
    #     category_data_lines = []
    #     for line in self.budget_category_data:
    #         dictionary_data = json.loads(line)
    #         category_data_lines.append(dictionary_data)
    #
    #     return category_data_lines
    #
    # def update_budget_data(self, data):
    #     # Checks if file is empty, so that newline is formatted correctly i.e no \n at start of empty file
    #     if os.path.getsize("budget_data.txt") > 0:
    #         self.budget_category_data.write("\n")
    #         json.dump(data, self.budget_category_data)
    #
    #     else:
    #         json.dump(data, self.budget_category_data)

    def create_category(self):
        new_category = input("Please insert your new budget category here: ")
        new_category_balance = input("Please insert the balance you want to set for this category "
                                     "(excluding dollar sign): ")
        unique_category = False
        valid_category_value = False

        if is_number(new_category_balance):
            valid_category_value = True

        # Parses json data into python dictionaries in a list, taking note of repeated category names and invalid values
        # category_data_lines = self.load_budget_data()

        # for category_dict in category_data_lines:
        #     if new_category in category_dict.keys():
        #         unique_category = False

        if unique_category and valid_category_value:
            new_category_dict = {new_category: new_category_balance}

            print("Your new category and balance have been saved in budget_data.")

            # Checks if file is empty, so that newline is formatted correctly i.e no \n at start of empty file
            # self.update_budget_data(new_category_dict)

        elif not unique_category:
            print("That category already exists.")

        elif not valid_category_value:
            print("You entered an invalid value for the budget balance.")

        else:
            print("Error in loading budget_data.")

    def check_balance(self):
        category_type = input("Please type which category you would like to see the balance of: ")
        unregistered_category = True
        category_data_lines = self.load_budget_data()
        for category_dict in category_data_lines:
            if category_type in category_dict.keys():
                unregistered_category = False
                category_balance = category_dict[category_type]
                print(f"The balance for {category_type} is {category_balance}.")

        if unregistered_category:
            print("The balance could not be found due to the program not recognising the category. \n"
                  "Please create the category first before asking for its balance.")

    def delete_category(self):
        category_data_lines = self.load_budget_data()
        # if category_data_lines == []:
        #    print("You currently do not have any categories in budget_data.")

        # need to actually load budget_data with json and make changes accordingly
        # Might have to do the removal and then put new information in again

        # Redo the structure of the data given into the .txt file so that it contains
        # A list of dictionaries and thus can be iterated through and list methods may be used such as .remove()
        # Make sure it is in proper json format with {{key: value}, {key2: value}} and .json file

        print(f"Here is a list of the current budget categories: {category_data_lines}")
        category = input("Please type which category you would like to remove: ")

        for category_dict in category_data_lines:
            if category in category_dict.keys():
                category_data_lines.remove(category_dict)

        print(f"Here is the updated list of the budget categories: {category_data_lines}")

        # Can find its index and then remove dict based on index or use remove()

    def deposit(self, category):
        deposit_amount = input("Please insert the amount you wish to deposit: ")

    def withdrawal(self, category):
        pass

    def transfer_balance(self, ):
        pass

# Use a main function and if "__name__" = "__main__" then main()

try:
    with open("budget_data.txt", "r+") as budget_data:
        # a+ puts the stream position at the end of the file, meaning if you need to read it won't return anything
        # Unless you use .seek(0) to move the file pointer to the beginning of the file
        # r+ has the file pointer at the start of the file which moves to the end of the file after reading,
        # allowing you to append data
        new_budget = BudgetApp(budget_data)

        new_budget.delete_category()


except FileNotFoundError:
    # w+ gives permission for both reading and writing
    f = open("budget_data.txt", "w")
    f.close()
    print("budget_data does not exist in the current directory and will now be created.")


# Testing if changes are being applied to Github repository
