1. Grab copy of repository:

```
git clone https://github.com/asteriskfar/literate-enigma.git myfolder
```

2. Navigate to folder `myfolder`

```
cd myfolder
```

3. Run `hugo` on dev server

```
hugo server
```

4. Vendor Hugo modules (to have local copy of modules/themes)

```
hugo mod vendor
```

5. Make changes

6. See status

```
git status
```

7. Add changes to staging

```
git add [individual files OR "." for all files]
```

8. Commit changes

```
git commit -m "Meaningful commit message"
```

9. Push changes

---

### Additional Configuration Options

```
# content/foo/_index.md
listChildren: true
```

enables listing of child pages on list page (main/middle part, not sidenav)


```
# config/params.toml

enableDarkSwitch = false
```

show/hide dark mode toggler