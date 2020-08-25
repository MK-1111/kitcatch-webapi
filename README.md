# kitcatch-wepapi
## get_timetable/:userid　（GET)
userの時間割の取得
## get_task/:userid　（GET）
userの課題の取得
## update_uuid　　（POST）
ワンタイムパスワードの更新

bodyに

{
    "userId":"5I",
    "uuid":"111111"
}
## post_timetable　　（POST）
時間割の更新

bodyに

{
    "userId":"5I",
    "timetable":data
}
## post_task　　（POST）
課題の更新

bodyに

{
    "userId":"5I",
    "task":data
}

## get_uuid/:userId
ワンタイムパスワードの取得
