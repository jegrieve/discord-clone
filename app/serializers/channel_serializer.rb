class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :messages, :colour, :server, :unique_users
end
