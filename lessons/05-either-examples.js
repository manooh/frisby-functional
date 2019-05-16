/*
LESSON 5: Either examples
*/

const { Nullable, tryCatch } = require('../js/lib');


// Example 1
{
    // stubs
    const openSiteI = () => {
        if (currentUser) {
            return renderPage(current_user);
        } else {
            return showLogin();
        }
    };

    const openSiteF = () =>
        Nullable(currentUser)
            .fold(showLogin, renderPage);
}

// Example 2
{
    // stubs
    const getPrefsI = user => {
        if (user.premium) {
            return loadPrefs(user.preferences);
        } else {
            return defaultPrefs;
        }
    };

    const getPrefsF = user =>
        Nullable(user.premium)
            .map(u => u.preferences)
            .fold(() => defaultPrefs, prefs => loadPrefs(prefs));
}

// Example 3
{
    const streetNameI = user => {
        const address = user.address;

        if (address) {
            const street = address.street;
            if (street) {
                return street.name;
            }
        }
        return 'no street';
    };

    const streetNameF = user =>
        Nullable(user.address)
            .chain(address => Nullable(address.street))
            .fold(
                () => 'no street',
                street => street.name
            );

    // See if it works
    const user_ok = {
        address: {
            street: {
                name: "Mariahilferstrasse 97",
            }
        }
    };

    const user_noaddr = {
        name: "Max"
    };

    const user_nostr = {
        address: {
            name: "Mariahilferstrasse 97",
        }
    };

    console.log('\n=== Example 3 ===');
    console.log(streetNameI(user_ok));
    console.log(streetNameF(user_ok));

    console.log(streetNameF(user_noaddr));
    console.log(streetNameF(user_nostr));
}

// Example 4
{
    const concatUniqI = (x, ys) => {
        const found = ys.filter(y => y === x)[0];
        return found ? ys : ys.concat(x);
    };

    const concatUniqF = (x, ys) =>
        Nullable(ys.filter(y => y === x)[0])
            .fold(
                () => ys.concat(x),
                () => ys
            );

    // See if it works
    console.log('\n=== Example 4 ===');
    const arr = ['a', 'b', 'c'];
    console.log(concatUniqI('d', arr));
    console.log(concatUniqI('a', arr));

    console.log(concatUniqF('d', arr));
    console.log(concatUniqF('a', arr));
}

// Example 5
{
    // stubs
    const wrapExamplesI = example => {
        if (example.previewPath) {
            try {
                example.preview = fs.readFileSync(example.previewPath);
            } catch(e) {

            }
        }
        return example;
    };

    const wrapExamplesF = example =>
        Nullable(example.previewPath)
            .chain(path => tryCatch(() => fs.readFileSync(path)))
            .fold(
                () => example,
                preview => Object.assign({ preview }, example)
            );
}


// Example 6
{
    // stubs
    const parseDbUrlI = cfg => {
        try {
            const c = JSON.parse(cfg);
            if(c.url) {
                return c.url.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
            }
        } catch (e) {
            return null;
        }
    };

    const parseDbUrlF = cfg =>
        tryCatch(() => JSON.parse(cfg))
            .chain(c => Nullable(c.url))
            .fold(
                e => null,
                url => url.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
            );
}
