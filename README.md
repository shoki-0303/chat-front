# README

This README would normally document whatever steps are necessary to get the
application up and running.

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|text|----|
|image|integer|----|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|text|null: false, unique: true|
|password|text|null: false|


### Association
- has_many :messages
- has_many :user_group
- has_many :groups, through: :user_group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :user_group
- has_many :users, through user_group

## user_groupテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
