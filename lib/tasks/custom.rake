namespace :db do
    desc 'Reset the database, run seed, and execute pending migrations'
    task reset_and_migrate: :environment do
      Rake::Task['db:drop'].invoke
      Rake::Task['db:create'].invoke
      Rake::Task['db:schema:load'].invoke
      Rake::Task['db:seed'].invoke
      Rake::Task['db:migrate'].invoke
    end
  end
  