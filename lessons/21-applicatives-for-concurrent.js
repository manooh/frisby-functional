/*
LESSON 21: Write applicatives for concurrent actions
*/

const Task = require('data.task');

// fake Db
const Db = ({
    find: id =>
        new Task((rej, res) =>
            setTimeout(() =>
                res({id: id, title: `Project ${id}`})
            ))
});

const reportHeader = (p1, p2) =>
    `Report: ${p1.title} compared to ${p2.title}`;

// sequential find
{
    const task =
        Db.find(20)
            .chain(p1 => Db.find(8)
                .map(p2 => reportHeader(p1, p2))
            );

    task.fork(e => console.log('err', e),
              x => console.log('Seq ' + x));
}

// concurrent find with applicatives
{
    const task =
        Task.of(p1 => p2 => reportHeader(p1, p2))
            .ap(Db.find(20))
            .ap(Db.find(8));

    task.fork(e => console.log('err', e),
              x => console.log('Con ' + x));
}
