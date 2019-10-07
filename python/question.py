def main():
    listOfQuestions={}
    while(True):
        answer=input("Enter a question or press q to quit:")
        if(answer=='q'):
            break
        listOfQuestions[answer]=input("Please enter your answer")
    with open("question.json",'a') as f:
        f.write(str(listOfQuestions))
main()