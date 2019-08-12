# README

# DB設計

## messagesテーブル

|Column|Type|Option|
|------|----|------|
|text|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### associateion
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Option|
|------|----|------|
|name|integer|null: false|
|email|integer|null: false|
|group_id|integer|null: false, foreign_key: true|
|password|integer|null:false|

### associateion
- has_many :messages
- has_many :groups_users
- has_many :groups, though: :groups_users


## groupsテーブル



### association
- has_many :messages
- has_many :groups_users
- has_many :users, though: :groups_users


## groups_usersテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### association
- belings_to :group
- belongs_to :user
