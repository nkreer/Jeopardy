import json, random, time
import urllib.request as url

category_count = int(input("How many categories do you want? "))
result = []

# Fetch the number of categories the user has asked for
for i in range(category_count):
    print("Retrieving category", i+1, "of", category_count)
    data = url.urlopen("http://jservice.io/api/category?id=" + str(random.randint(1, 10000)))
    clues = json.loads(data.read())
    category = {}
    print("Title:", clues["title"])
    category["name"] = clues["title"]
    category["clues"] = []
    clueCount = 1
    # Loop through the clues and add them
    for clue in clues["clues"]:
        # Only get five clues
        if clueCount <= 5:
            append_clue = {}
            append_clue["clue"] = clue["question"]
            append_clue["response"] = clue["answer"]
            category["clues"].append(append_clue)
        clueCount += 1

    result.append(category)

export_name = "clues/generated-" + str(time.time()) + ".json"
print("Exporting as", export_name)
with open(export_name, "w+") as file:
    json.dump(result, file)