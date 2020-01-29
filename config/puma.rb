# frozen_string_literal: true
preload_app!
workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = ENV.fetch('RAILS_MAX_THREADS') { 5 }
threads threads_count, threads_count

rackup DefaultRackup
port        ENV.fetch('PORT') { 3000 }
environment ENV.fetch('RACK_ENV') { 'development' }

if ENV['RACK_ENV'] == 'production' and ENV['STAGING'] == 'true'
  app_dir = File.expand_path("../..", __FILE__)
  shared_dir = "#{app_dir}/shared"
  bind "unix://#{shared_dir}/sockets/puma.sock"

  stdout_redirect "#{shared_dir}/log/puma.stdout.log", "#{shared_dir}/log/puma.stderr.log", true

  pidfile "#{shared_dir}/pids/puma.pid"
  state_path "#{shared_dir}/pids/puma.state"
  activate_control_app
end

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
