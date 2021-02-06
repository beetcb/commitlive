<p align="center">
  <a href="https://github.com/beetcb/commitlive">
    <img src="assets/demo.svg" alt="demo" width="600">
  </a>
  <h3 align="center">commitlive: livly cli to make conventional commit</h3>
  <p align="center">
    Probably the most elegant way to make a <code>conventional commit</code> on the <strong>command line</strong>
  </p>
</p>

### Features

- `tab completion`, `placeholders` and `livly prompt`: this gives the user enough hints to make a better commit, with the help of [repll](https://github.com/beetcb/repll)

- `find issues for you`: when you start typing `#` with a number, we will search for issues on github, it's based on [gh cli](https://github.com/cli/cli), make sure it's installed and configured

- `conventional commit lint`: while you are typing, we lint it for you using the great [commitlint](https://github.com/conventional-changelog/commitlint)(!NOTE: When linting, we won't prompt \<body\> & \<footer\> as an input, this avoids overwhelming output message)

- `focus more on typing rather than choosing`: some other commit tools pop up prompts for the user to select, whereas in `commitlive` you just type something and press tab to complete, which I think is closer to the way we interact with command line

- `very close to git commit command`: under the hood, `commitlive` just run `git commit` command for you with the flag and commit you provided, and `flag` is always same as `git commit`

### Usage

```js
npm i -g commitlive
```

Run commitlive to commit your staged changes:

```bash
commitlive -m
```

Or make them staged while committing:

```bash
commitlive -am
```

You may have noticed, it's same as `git commit`, quite easy to grasp its usage

Finally, be a good commitzen

### Related projects

- [commitzen-cli](https://github.com/commitizen/cz-cli)
- [commitlint](https://github.com/conventional-changelog/commitlint)
