require 'tempfile'

namespace :rh_cloud_inventory do
  namespace :report do
    desc 'Generate inventory report to be sent to Red Hat cloud'
    task generate: :environment do
      portal_user = ENV['portal_user']
      organizations = [ENV['organization_id']]
      base_folder = ENV['target'] || Dir.pwd

      unless portal_user || organizations.empty?
        puts "Must specify either portal_user or organization_id"
      end

      User.as_anonymous_admin do
        if portal_user
          puts "Generating report for all organizations associated with #{portal_user}"
          base_folder = File.join(base_folder, portal_user)
          organizations = ForemanInventoryUpload::Generators::Queries.organizations_for_user(portal_user).pluck(:id)
        end

        organizations.each do |organization|
          target = File.join(base_folder, ForemanInventoryUpload.facts_archive_name(organization))
          archived_report_generator = ForemanInventoryUpload::Generators::ArchivedReport.new(target, Logger.new(STDOUT))
          archived_report_generator.render(organization: organization)
          puts "Successfully generated #{target} for organization id #{organization}"
        end
      end
    end
  end

  desc "Synchronize Insights hosts hits"
  task sync: :environment do
    InsightsCloud::Async::InsightsFullSync.perform_now()
    puts "Synchronized Insights hosts hits data"
  end
end
