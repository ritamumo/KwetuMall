# Adding a code base to Github

1. check if you have .git in any of your folders
2. initialize a git repository
    >git init
3. create a .gitignore file ->this should include items like node modules
    -git ignore is a file that contains all the files and folders you dont want to add to github
4. Add all the files to our git repository using:
    >git add .
5. Add a commit message
    > git commit -m 'first commit'       
6. Connect to the online repository using:
    >git remote add origin _______________________
7. Push the code
    >git push origin master

# Making Commits

-Ideally each time you make a substancial change
    > git add .
    > git commit -m 'message related to the changes'
    > git push origin master
